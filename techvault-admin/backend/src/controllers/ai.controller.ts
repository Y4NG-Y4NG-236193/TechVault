import { Request, Response, NextFunction } from 'express'
import { AIService } from '../services/ai.service'

export class AIController {
    /**
     * Generates a compelling product description based on provided attributes.
     */
    static async generateProductDescription(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, brand, specs } = req.body
            console.log('[AIController] Generating description for:', { name, brand });

            if (!name && !brand && !specs) {
                return res.status(400).json({ error: 'Product name, brand, and technical specifications are required' })
            }

            const prompt = [
                {
                    role: 'system',
                    content: `You are an expert product copywriter for TechVault, a premium electronics retailer. 
                    Your goal is to write a compelling, professional, and concise product description.
                    Focus on benefits and target audience. Keep it under 100 words.
                    Use a sophisticated yet accessible tone.`
                },
                {
                    role: 'user',
                    content: `Generate a product description for:
                    Name: ${name}
                    Brand: ${brand || 'Unknown'}
                    Specifications: ${JSON.stringify(specs || {})}
                    
                    The description should sound high-end and tech-focused.`
                }
            ]

            const description = await AIService.getChatCompletion(prompt)

            res.json({ description })
        } catch (error) {
            next(error)
        }
    }
}
