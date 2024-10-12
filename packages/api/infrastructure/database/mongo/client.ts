import { MongoClient } from 'mongodb'
import { Applogger } from 'shared'

let instance: MongoClient

const exitProcessCode = 1

export async function initiateMongoDB(): Promise<void> {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await import('./startAndSeedMemoryDB')
    }

    const dataBaseUrl: string = process.env.DATABASE_URL ?? ''

    if (!instance) {
      instance = new MongoClient(dataBaseUrl)
      Applogger.info('Connecting to MongoDB...')

      await instance.connect()
      Applogger.info('Successfully connected to MongoDB!')
    }
  } catch (err) {
    Applogger.error(err, 'MongoDB connection failed')
    process.exit(exitProcessCode)
  }
}

export function getMongoDBClient(): MongoClient {
  if (!instance) {
    throw new Error('MongoDB client not connected.')
  }

  return instance
}
