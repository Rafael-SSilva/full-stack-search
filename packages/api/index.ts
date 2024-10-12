import cors from 'cors'
import { errorHandler } from 'domain/utils/error-handler'
import dotenv from 'dotenv'
import express from 'express'
import { initiateMongoDB } from 'infrastructure/database/mongo/client'
import { initiateRoutes } from 'interface/routes'
import { Applogger } from 'shared'

dotenv.config()

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./infrastructure/database/mongo/startAndSeedMemoryDB')
}

const defaultPort = 3001
const PORT = process.env.PORT || defaultPort

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const app = express()

app.use(cors())
app.use(express.json())

;(async (): Promise<void> => {
  await initiateMongoDB()

  app.use(await initiateRoutes())
  app.use(errorHandler)
})()

app.listen(PORT, () => {
  Applogger.info(`API Server Started at ${PORT}`)
})
