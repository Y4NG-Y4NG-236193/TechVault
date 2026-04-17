import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from './middleware/errorHandler'
import searchRouter from './routes/search'
import productRouter from './routes/product.routes'

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() })
})

// Routes
app.use(searchRouter)
app.use(productRouter)

// Error Handling (Must be last)
app.use(errorHandler)

export default app
