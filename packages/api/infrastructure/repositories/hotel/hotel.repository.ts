import { HotelRepository } from 'domain/interfaces/hotel.repository'
import { type Collection, Condition, type MongoClient, ObjectId } from 'mongodb'
import { Hotel } from 'shared'

export class MongoHotelRepository implements Partial<HotelRepository> {
  private collection: Collection<Hotel>

  constructor(private readonly client: MongoClient) {
    this.collection = this.client.db().collection<Hotel>('hotels')
  }

  async findAll(search?: string): Promise<Hotel[]> {
    const queryRegex = new RegExp(search ?? '', 'i')

    const query = search
      ? {
          $or: [
            { chainName: { $regex: queryRegex } },
            { hotel_name: { $regex: queryRegex } },
            { city: { $regex: queryRegex } },
            { state: { $regex: queryRegex } },
            { zipCode: { $regex: queryRegex } },
            { country: { $regex: queryRegex } },
            { addressLine1: { $regex: queryRegex } },
            { addressLine2: { $regex: queryRegex } },
          ],
        }
      : {}

    return await this.collection.find(query).toArray()
  }

  async findById(id: string): Promise<Hotel | null> {
    if (!ObjectId.isValid(id)) {
      return null
    }

    return await this.collection.findOne({
      _id: new ObjectId(id) as unknown as Condition<string>,
    })
  }
}
