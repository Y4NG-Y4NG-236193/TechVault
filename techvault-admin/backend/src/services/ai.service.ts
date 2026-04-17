import Groq from 'groq-sdk'
import 'dotenv/config'

const apiKey = process.env.GROQ_API_KEY

if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY. Check your .env file.')
}

export const groq = new Groq({
    apiKey: apiKey
})

export class AIService {
    /**
     * Creates a vector embedding for a given text query.
     */
    static async createEmbedding(input: string) {
        const response = await groq.embeddings.create({
            model: 'nomic-embed-text-v1',
            input: input
        })
        return response.data[0].embedding
    }

    /**
     * Generates a chat completion response using Llama models.
     */
    static async getChatCompletion(messages: any[], model: string = 'llama3-70b-8192') {
        const response = await groq.chat.completions.create({
            model: model,
            messages: messages
        })
        return response.choices[0].message.content
    }
}
