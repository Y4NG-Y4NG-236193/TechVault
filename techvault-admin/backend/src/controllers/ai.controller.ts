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
                    content: `
                You are a senior product copywriter for TechVault, a premium electronics retailer.

                STRICT RULES:
                - Do NOT invent specifications, features, or claims not present in the input.
                - If data is missing, omit it naturally. Do NOT guess or fill gaps.
                - Do NOT use vague hype like "best", "ultimate", or "revolutionary" unless supported by specs.
                - Avoid technical inaccuracies. Stay grounded in provided data only.
                - Keep output under 100 words.
                - No emojis, no markdown, no bullet points.

                STYLE:
                - Tone: premium, modern, tech-focused
                - Writing: concise, benefit-driven, clear
                - Focus: real-world value and user experience
                - Target: tech-savvy consumers

                OUTPUT FORMAT:
                Return ONLY the final product description as plain text.
                `
                },
                {
                    role: 'user',
                    content: `
                Generate a product description using ONLY the provided data.

                INPUT:
                Name: ${name || 'N/A'}
                Brand: ${brand || 'Unknown'}
                Specifications: ${JSON.stringify(specs || {})}

                INSTRUCTIONS:
                - Highlight 2–3 key benefits derived from specs
                - Translate specs into user value (e.g., fast performance, smooth multitasking)
                - If specs are empty or insufficient, produce a generic but still premium description WITHOUT fabricating details
                - Do NOT repeat raw JSON or list specs explicitly
                - Ensure accuracy and realism
                `
                }
            ];

            const description = await AIService.getChatCompletion(prompt)

            res.json({ description })
        } catch (error) {
            next(error)
        }
    }
}
