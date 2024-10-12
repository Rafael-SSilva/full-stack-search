import { HotelRepository } from 'domain/interfaces/hotel.repository'
import { FindHotelUseCase } from 'use-cases/hotel/find-hotel'
import { ListHotelsUseCase } from 'use-cases/hotel/list-hotels'

export interface HotelContainer {
  getListHotelsUseCase: () => ListHotelsUseCase
  getFindHotelUseCase: () => FindHotelUseCase
}

export function hotelContainer(
  hotelRepository: HotelRepository,
): HotelContainer {
  function getListHotelsUseCase(): ListHotelsUseCase {
    return new ListHotelsUseCase(hotelRepository)
  }

  function getFindHotelUseCase(): FindHotelUseCase {
    return new FindHotelUseCase(hotelRepository)
  }

  return {
    getFindHotelUseCase,
    getListHotelsUseCase,
  }
}
