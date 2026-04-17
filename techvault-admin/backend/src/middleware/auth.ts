declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

import { Request, Response, NextFunction } from 'express'
import { supabase } from '../services/supabase.service'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token' })

    // Ask Supabase: "Is this token valid? Who is it?"
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return res.status(401).json({ error: 'Invalid token' })

    req.user = user // attach user to every protected request
    next()
}