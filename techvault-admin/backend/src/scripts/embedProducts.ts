import { supabase } from '../services/supabase.service'
import { AIService } from '../services/ai.service'
import 'dotenv/config'

async function embedAllProducts() {
    const { data: products } = await supabase.schema('TechVault').from('Products').select('*')

    if (!products) return

    for (const product of products) {
        // Convert product description into a vector
        const embedding = await AIService.createEmbedding(`${product.name} ${product.description} ${product.category}`)

        // Sve the fingerprint back to Supabase
        await supabase
            .schema('TechVault')
            .from('Products')
            .update({ embedding })
            .eq('product_id', product.product_id)


    }
}
