// backend/src/queues/orderQueue.ts
import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis(process.env.REDIS_URL!)

// Placeholder for sending email - implement actual logic here
export const sendOrderEmail = async (data: any) => {
    console.log(`Sending order confirmation to ${data.userEmail} for order ${data.orderId}`)
    // Add your email sending logic (e.g., using Nodemailer or SendGrid) here
}

// The mailbox where jobs are dropped
export const orderQueue = new Queue('orders', { connection })

// The worker that processes jobs one by one
new Worker('orders', async job => {
    if (job.name === 'send-confirmation') {
        await sendOrderEmail(job.data) // runs in background, user never waits
    }
}, { connection })

// Function to add a job to the queue
export const addOrderToQueue = async (orderId: string, userEmail: string, items: any[]) => {
    await orderQueue.add('send-confirmation', { orderId, userEmail, items })
}