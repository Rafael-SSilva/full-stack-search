import { cities } from 'infrastructure/database/mongo/seeds/cities.js'
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Applogger } from 'shared'

import { countries } from './seeds/countries'
import { hotels } from './seeds/hotels'

const exitProcess = 0

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  },
})
Applogger.info(`MongoMemoryServer started on ${mongod.getUri()}`)

const uri = mongod.getUri()

process.env.DATABASE_URL = uri

const client = new MongoClient(uri)
try {
  await client.connect()
  const db = client.db()
  await db.collection('cities').insertMany(cities)
  await db.collection('countries').insertMany(countries)
  await db.collection('hotels').insertMany(hotels)
} catch (error) {
  Applogger.error('Error seeding database:', error)
} finally {
  await client.close()
}

process.on('SIGTERM', async () => {
  await mongod.stop()
  process.exit(exitProcess)
})
