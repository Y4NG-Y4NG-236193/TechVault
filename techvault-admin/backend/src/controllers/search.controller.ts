import { Request, Response, NextFunction } from 'express'
import { supabase } from '../services/supabase.service'
import { AIService } from '../services/ai.service'

export class SearchController {
    static async searchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { query } = req.body

            if (!query) {
                return res.status(400).json({ error: 'Query is required' })
            }

            // Step 1: Create embedding for the query
            const queryVector = await AIService.createEmbedding(query)

            // Step 2: Semantic search in Supabase
            const { data: products, error } = await supabase.rpc('match_products', {
                query_embedding: queryVector,
                match_count: 5
            })

            if (error) throw error

            // Step 3: AI Augmentation
            const prompt = [
                {
                    role: 'system',
                    content: `You are a helpful shopping assistant. Only recommend products from the provided list.`
                },
                {
                    role: 'user',
                    content: `User asked: "${query}"\n\nAvailable products:\n${JSON.stringify(products, null, 2)}`
                }
            ]

            const aiResponse = await AIService.getChatCompletion(prompt)

            res.json({
                answer: aiResponse,
                products
            })
        } catch (error) {
            next(error) // Send to global error handler
        }
    }
}
