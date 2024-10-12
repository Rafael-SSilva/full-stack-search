import { CityRepository } from 'domain/interfaces/city.repository'
import { type Collection, Condition, type MongoClient, ObjectId } from 'mongodb'
import { City } from 'shared'

export class MongoCityRepository implements CityRepository {
  private collection: Collection<City>

  constructor(private readonly client: MongoClient) {
    this.collection = this.client.db().collection<City>('cities')
  }

  async findAll(search?: string): Promise<City[]> {
    const query = search
      ? {
          name: { $regex: search, $options: 'i' },
        }
      : {}

    return await this.collection.find(query).toArray()
  }

  async findById(id: string): Promise<City | null> {
    if (!ObjectId.isValid(id)) {
      return null
    }

    return await this.collection.findOne<City>({
      _id: new ObjectId(id) as unknown as Condition<string>,
    })
  }
}
