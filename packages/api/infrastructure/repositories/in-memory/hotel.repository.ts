/* eslint-disable require-await */
import { Hotel } from 'domain/entities/hotel/hotel'
import { HotelRepository } from 'domain/interfaces/hotel.repository'

type HotelStringFields = Omit<Hotel, 'star_rating'>

export class HotelInMemoryRepository implements HotelRepository {
  private hotelsMap = new Map<string, Hotel>()

  constructor(private readonly throwError?: { message: string }) {}

  private throwCustomError(): void {
    if (this.throwError?.message) {
      throw new Error(this.throwError.message)
    }
  }

  private propertiesHasValue(
    hotel: HotelStringFields,
    props: (keyof HotelStringFields)[],
    search: string,
  ): boolean {
    return props.some((prop): boolean => {
      const hotelProperty = hotel[prop]

      return hotelProperty.includes(search)
    })
  }

  async findAll(search?: string): Promise<Hotel[]> {
    this.throwCustomError()

    const hotels = Array.from(this.hotelsMap.values())

    if (!search) {
      return hotels
    }

    const properties: (keyof HotelStringFields)[] = [
      'hotel_name',
      'city',
      'country',
    ]

    return hotels.filter((hotel) =>
      this.propertiesHasValue(hotel, properties, search),
    )
  }

  async findById(id: string): Promise<Hotel | null> {
    this.throwCustomError()

    return Promise.resolve(this.hotelsMap.get(id) ?? null)
  }

  async addHotel(hotel: Hotel): Promise<void> {
    if (!this.hotelsMap.get(hotel.hotel_name)) {
      this.hotelsMap.set(hotel._id, hotel)
    }
  }
}
