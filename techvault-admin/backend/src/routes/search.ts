import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { SearchController } from '../controllers/search.controller'

const router = Router()

/**
 * @route   POST /api/search
 * @desc    AI-powered semantic product search
 * @access  Protected
 */
router.post('/api/search', requireAuth, SearchController.searchProducts)

export default router