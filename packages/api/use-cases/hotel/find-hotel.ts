import { HotelRepository } from 'domain/interfaces/hotel.repository'
import { ApplicationError } from 'domain/utils/error'
import { Hotel } from 'shared'

export class FindHotelUseCase {
  private hotelRepository: HotelRepository

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository
  }

  async execute(hotelId: string): Promise<Hotel | null> {
    try {
      return await this.hotelRepository.findById(hotelId)
    } catch (error) {
      if (!(error instanceof ApplicationError)) {
        throw Error('Error while getting hotel. Please check the logs')
      }

      throw error
    }
  }
}
