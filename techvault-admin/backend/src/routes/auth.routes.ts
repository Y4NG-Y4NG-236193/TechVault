import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @route   POST /api/auth/verify-access
 * @desc    Verify if a user has admin access
 * @access  Public (Verification happens against DB)
 */
router.post('/api/auth/verify-access', AuthController.verifyAccess);

export default router;
