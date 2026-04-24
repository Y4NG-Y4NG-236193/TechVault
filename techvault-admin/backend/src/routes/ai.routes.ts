import { Router } from 'express'
import { AIController } from '../controllers/ai.controller'

const router = Router()

/**
 * @route POST /api/ai/generate-description
 * @desc Generate an AI-powered product description
 * @access Public (or add auth middleware if needed)
 */
router.get('/health', (req, res) => res.json({ status: 'ai router ok' }))
router.post('/generate-description', AIController.generateProductDescription)

export default router
