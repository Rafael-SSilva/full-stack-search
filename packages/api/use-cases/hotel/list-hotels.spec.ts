import { HotelInMemoryRepository } from '../../infrastructure/repositories/in-memory/hotel.repository'
import { mockHotels } from '../__mocks__/hotel'
import { ListHotelsUseCase } from './list-hotels'

describe('Find Country use case', () => {
  const repository = new HotelInMemoryRepository()

  beforeAll(() => {
    //add in-memory hotels
    mockHotels.forEach((hotel) => {
      repository.addHotel(hotel)
    })
  })

  it('should return an empty list when no hotel is found', async () => {
    const query = 'Aa'

    const listHotelsUseCase = new ListHotelsUseCase(repository)

    const counties = await listHotelsUseCase.execute(query)

    expect(counties).toEqual([])
  })

  it('should return all hotels matching the query', async () => {
    const query = 'Ch'
    const toHaveLengthOf2 = 2

    const listHotelsUseCase = new ListHotelsUseCase(repository)
    const hotels = await listHotelsUseCase.execute(query)

    const startingWithChCountries = mockHotels.filter((c) =>
      c.country.includes(query),
    )

    expect(hotels).toHaveLength(toHaveLengthOf2)
    expect(hotels).toEqual(startingWithChCountries)
  })

  it('should return all hotels when no search param is specified', async () => {
    const listHotelsUseCase = new ListHotelsUseCase(repository)

    expect(await listHotelsUseCase.execute()).toHaveLength(mockHotels.length)
  })
})
