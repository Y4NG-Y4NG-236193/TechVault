import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'
import 'dotenv/config'
import searchRouter from './routes/search'

const app = express()
app.use(cors(), express.json())

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY! // service key for server-side
)

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

app.use(searchRouter)

app.listen(4000, () => console.log('API running on :4000'))