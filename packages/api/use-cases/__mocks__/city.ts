import { randomUUID } from 'crypto'
import { City } from 'shared'

export const mockCities: City[] = [
  { name: 'Cartagena', _id: randomUUID() },
  { name: 'Dublin', _id: randomUUID() },
  { name: 'Edinburgh', _id: randomUUID() },
  { name: 'Hangzhou', _id: randomUUID() },
  { name: 'Hildesheim', _id: randomUUID() },
  { name: 'Hong Kong', _id: randomUUID() },
  { name: 'Hurghada', _id: randomUUID() },
]
