/* eslint-disable require-await */
import { HotelInMemoryRepository } from '../../infrastructure/repositories/in-memory/hotel.repository'
import { mockHotels } from '../__mocks__/hotel'
import { FindHotelUseCase } from './find-hotel'

describe('Find Hotel use case', () => {
  const repository = new HotelInMemoryRepository()

  beforeAll(() => {
    //add in-memory hotels
    mockHotels.forEach((hotel) => {
      repository.addHotel(hotel)
    })
  })

  it('should throw when repository find any error', async () => {
    const errorMessage = 'Repository Error'
    const throwRepository = new HotelInMemoryRepository({
      message: errorMessage,
    })
    const findHotelUseCase = new FindHotelUseCase(throwRepository)

    expect(async () => await findHotelUseCase.execute('a')).rejects.toThrow(
      errorMessage,
    )
  })

  it('should return null when hotel is not found', async () => {
    const findHotelUseCase = new FindHotelUseCase(repository)

    expect(await findHotelUseCase.execute('a')).toBeNull()
  })

  it('should return the hotel object when it is found', async () => {
    const findHotelUseCase = new FindHotelUseCase(repository)

    const [firstHotel] = mockHotels

    expect(await findHotelUseCase.execute(firstHotel._id)).toEqual(firstHotel)
  })
})
