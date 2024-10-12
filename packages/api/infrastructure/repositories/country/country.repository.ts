import { CountryRepository } from 'domain/interfaces/country.repository'
import { type Collection, Condition, type MongoClient, ObjectId } from 'mongodb'
import { Country } from 'shared'

export class MongoCountryRepository implements CountryRepository {
  private collection: Collection<Country>

  constructor(private readonly client: MongoClient) {
    this.collection = this.client.db().collection<Country>('countries')
  }

  async findAll(search?: string): Promise<Country[]> {
    const query = search
      ? {
          country: { $regex: search, $options: 'i' },
        }
      : {}

    return await this.collection.find(query).toArray()
  }

  async findById(id: string): Promise<Country | null> {
    if (!ObjectId.isValid(id)) {
      return null
    }

    return await this.collection.findOne<Country>({
      _id: new ObjectId(id) as unknown as Condition<string>,
    })
  }
}
