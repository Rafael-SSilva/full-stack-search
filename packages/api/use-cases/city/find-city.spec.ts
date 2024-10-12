/* eslint-disable require-await */
import { CityInMemoryRepository } from '../../infrastructure/repositories/in-memory/city.repository'
import { mockCities } from '../__mocks__/city'
import { FindCityUseCase } from './find-city'

describe('Find Country use case', () => {
  const repository = new CityInMemoryRepository()

  beforeAll(() => {
    //add in-memory cities
    mockCities.forEach((city) => {
      repository.addCity(city)
    })
  })

  it('should throw when repository find any error', async () => {
    const errorMessage = 'Repository Error'
    const throwRepository = new CityInMemoryRepository({
      message: errorMessage,
    })
    const findCityUseCase = new FindCityUseCase(throwRepository)

    expect(async () => await findCityUseCase.execute('a')).rejects.toThrow(
      errorMessage,
    )
  })

  it('should return null when city is not found', async () => {
    const findCityUseCase = new FindCityUseCase(repository)

    expect(await findCityUseCase.execute('a')).toBeNull()
  })

  it('should return the city object when it is found', async () => {
    const findCityUseCase = new FindCityUseCase(repository)

    const [firstCity] = mockCities

    expect(await findCityUseCase.execute(firstCity._id)).toEqual(firstCity)
  })
})
