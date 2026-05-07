import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from './middleware/errorHandler'
import searchRouter from './routes/search'
import productRouter from './routes/product.routes'
import customerRouter from './routes/customer.routes'
import aiRouter from './routes/ai.routes'
import authRouter from './routes/auth.routes'

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'TechVault API is running',
        version: '1.0.0',
        documentation: '/api/health'
    })
})

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() })
})

app.get('/api/debug-ping', (req, res) => res.json({ message: 'pong from app.ts' }))

// Routes
app.use('/api/ai', aiRouter)
app.use(searchRouter)
app.use(productRouter)
app.use(customerRouter)
app.use(authRouter)

// Error Handling (Must be last)
app.use(errorHandler)

export default app
// Trigger nodemon restart
