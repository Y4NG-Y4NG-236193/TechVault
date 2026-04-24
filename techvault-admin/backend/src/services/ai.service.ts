import Groq from 'groq-sdk'
import 'dotenv/config'

const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
        throw new Error('Missing GROQ_API_KEY. Check your .env file.')
    }
    return new Groq({ apiKey })
}

export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy' })

export class AIService {
    /**
     * Creates a vector embedding for a given text query.
     */
    static async createEmbedding(input: string) {
        const client = getGroqClient()
        const response = await client.embeddings.create({
            model: 'nomic-embed-text-v1',
            input: input
        })
        return response.data[0].embedding
    }

    /**
     * Generates a chat completion response using Llama models.
     */
    static async getChatCompletion(messages: any[], model: string = 'groq/compound') {
        try {
            const client = getGroqClient()
            const response = await client.chat.completions.create({
                model: model,
                messages: messages
            })
            return response.choices[0].message.content
        } catch (error: any) {
            console.error('[AIService] Groq API Error:', error.message)
            throw error
        }
    }
}
