import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.service';

export class CustomerController {
    // 1. Get all products
    static async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const { data: customers, error } = await supabase
                .schema('TechVault')
                .from('Customers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }

    // 2. Get customer by ID
    static async getCustomerById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const { data: customer, error } = await supabase
                .schema('TechVault')
                .from('Customers')
                .select('*')
                .eq('customer_id', id)
                .single();

            if (error) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }

    // 3. Create a new customer
    static async createCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { first_name, last_name, email, avatar_url } = req.body;

            if (!first_name || !last_name || email === undefined) {
                return res.status(400).json({ error: 'Full name and email is required!' });
            }

            const { data: newCustomer, error } = await supabase
                .schema('TechVault')
                .from('Customers')
                .insert([
                    {
                        first_name,
                        last_name,
                        email,
                        avatar_url,
                    }
                ])
                .select()
                .single();

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(201).json(newCustomer);
        } catch (error) {
            next(error);
        }
    }

    // 4. Update an existing customer
    static async updateCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const { data: updatedCustomer, error } = await supabase
                .schema('TechVault')
                .from('Customers')
                .update(updates)
                .eq('customer_id', id)
                .select()
                .single();

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json(updatedCustomer);
        } catch (error) {
            next(error);
        }
    }

    // 5. Delete Customer
    static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const { error } = await supabase
                .schema('TechVault')
                .from('Customers')
                .delete()
                .eq('customer_id', id);

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}
