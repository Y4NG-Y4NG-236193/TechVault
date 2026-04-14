import Groq from 'groq-sdk'
import { supabase } from '..'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function embedAllProducts() {
    const { data: products } = await supabase.from('products').select('*')

    for (const product of products!) {
        //Convert product description into a vector (list of 1536 numbers)
        const response = await groq.embeddings.create({
            model: 'nomic-embed-text-v1',
            input: `${product.name} ${product.description} ${product.category}`
        })

        const embedding = response.data[0].embedding

        // Sve the fingerprint back to Supabase
        await supabase
            .from('products')
            .update({ embedding })
            .eq('id', product.id)


    }
}
