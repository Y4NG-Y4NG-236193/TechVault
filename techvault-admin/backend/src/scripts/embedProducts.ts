import { supabase } from '../services/supabase.service'
import { AIService } from '../services/ai.service'
import 'dotenv/config'

async function embedAllProducts() {
    const { data: products } = await supabase.from('products').select('*')

    if (!products) return

    for (const product of products) {
        // Convert product description into a vector
        const embedding = await AIService.createEmbedding(`${product.name} ${product.description} ${product.category}`)

        // Sve the fingerprint back to Supabase
        await supabase
            .from('products')
            .update({ embedding })
            .eq('id', product.id)


    }
}
