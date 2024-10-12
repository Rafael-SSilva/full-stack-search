import { ApplicationError } from 'domain/utils/error'
import { constants } from 'http2'
import { HotelContainer } from 'infrastructure/containers/hotel-container'
import { Applogger } from 'shared'
import { ExpressContext } from 'types/express'
import { FindHotelUseCase } from 'use-cases/hotel/find-hotel'
import { ListHotelsUseCase } from 'use-cases/hotel/list-hotels'

export class HotelController {
  private listHotelsUseCase: ListHotelsUseCase
  private findHotelUseCase: FindHotelUseCase

  constructor(readonly hotelContainer: HotelContainer) {
    this.listHotelsUseCase = hotelContainer.getListHotelsUseCase()
    this.findHotelUseCase = hotelContainer.getFindHotelUseCase()
  }

  async listHotels({ request, response, next }: ExpressContext): Promise<void> {
    try {
      const { hotel } = request.query
      const hotels = await this.listHotelsUseCase.execute(hotel?.toString())

      response.status(constants.HTTP_STATUS_OK).json(hotels)
    } catch (error) {
      next(error)
    }
  }

  async getHotel({ request, response, next }: ExpressContext): Promise<void> {
    const { id } = request.params

    try {
      const hotel = await this.findHotelUseCase.execute(id)

      if (!hotel) {
        throw new ApplicationError(
          'Hotel not found',
          constants.HTTP_STATUS_NOT_FOUND,
        )
      }

      response.status(constants.HTTP_STATUS_OK).json(hotel)
    } catch (err) {
      if (!(err instanceof ApplicationError)) {
        throw Error('Error while getting Hotel. please check the logs')
      }

      Applogger.error({ err, 'thm.hotel.id': id }, 'Application error')

      next(err)
    }
  }
}
