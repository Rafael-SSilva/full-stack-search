import { Applogger, Hotel } from 'shared'

import { HotelRepository } from '../../domain/interfaces/hotel.repository'

export class ListHotelsUseCase {
  private hotelRepository: HotelRepository

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository
  }

  async execute(search?: string): Promise<Hotel[]> {
    try {
      return await this.hotelRepository.findAll(search)
    } catch (err) {
      Applogger.error(
        { err, 'thm.hotel.search': search },
        'ListHotelsUseCase error',
      )
      throw Error('Error while listing hotel. Please check the logs')
    }
  }
}
