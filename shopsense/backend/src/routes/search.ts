import { Router } from 'express'
import { supabase, groq } from '../index'
import { requireAuth } from '../middleware/auth'

const router = Router()

// backend/src/routes/search.ts
router.post('/api/search', requireAuth, async (req, res) => {
    const { query } = req.body

    // Step 1: Turn the user's question into a vector
    const embeddingRes = await groq.embeddings.create({
        model: 'nomic-embed-text-v1',
        input: query
    })
    const queryVector = embeddingRes.data[0].embedding

    // Step 2: Find the 5 most similar products in the database
    const { data: products } = await supabase.rpc('match_products', {
        query_embedding: queryVector,
        match_count: 5
    })

    // Step 3: Feed products to the AI, ask it to write a helpful reply
    const aiResponse = await groq.chat.completions.create({
        model: 'llama3-70b-8192',  // free on Groq
        messages: [
            {
                role: 'system',
                content: `You are a helpful shopping assistant. Only recommend products from the provided list.`
            },
            {
                role: 'user',
                content: `User asked: "${query}"\n\nAvailable products:\n${JSON.stringify(products, null, 2)}`
            }
        ]
    })

    res.json({
        answer: aiResponse.choices[0].message.content,
        products  // also return raw products for the UI to render
    })
})

export default router