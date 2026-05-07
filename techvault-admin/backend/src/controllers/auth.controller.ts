import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.service';

export class AuthController {
    /**
     * Verifies if the authenticated user has superadmin access.
     */
    static async verifyAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: 'Email is required for verification' });
            }

            // Check if the email exists in the TechVault.superadmins table
            const { data, error } = await supabase
                .schema('TechVault')
                .from('superadmins')
                .select('*')
                .eq('email', email)
                .single();

            if (error) {
                if (error.code === 'PGRST116') { // No rows found
                    return res.status(403).json({ 
                        authorized: false, 
                        message: 'Access Denied: You are not registered as a SuperAdmin.' 
                    });
                }
                // Handle permission denied or other database errors
                console.error('Database error during access verification:', error.message);
                return res.status(500).json({ 
                    error: 'Verification service unavailable',
                    details: error.message 
                });
            }

            // If we found a record, they are authorized. Update tracking fields.
            const user = data;

            // 1. Check if account is active
            if (!user.is_active) {
                return res.status(403).json({ 
                    authorized: false, 
                    message: 'Access Denied: This SuperAdmin account is currently inactive.' 
                });
            }

            // 2. Check if account is locked
            if (user.locked_until && new Date(user.locked_until) > new Date()) {
                return res.status(403).json({ 
                    authorized: false, 
                    message: `Access Denied: Account is locked until ${new Date(user.locked_until).toLocaleString()}.` 
                });
            }

            const { error: updateError } = await supabase
                .schema('TechVault')
                .from('superadmins')
                .update({
                    last_login_at: new Date().toISOString(),
                    last_login_ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                    failed_login_attempts: 0 // Reset failed attempts on success
                })
                .eq('email', email);

            if (updateError) {
                console.error('Failed to update login tracking:', updateError.message);
            }

            return res.status(200).json({ 
                authorized: true, 
                user: data 
            });

        } catch (error) {
            next(error);
        }
    }
}
