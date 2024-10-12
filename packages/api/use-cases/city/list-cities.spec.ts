import { CityInMemoryRepository } from '../../infrastructure/repositories/in-memory/city.repository'
import { mockCities } from '../__mocks__/city'
import { ListCitiesUseCase } from './list-cities'

describe('List Cities use case', () => {
  const repository = new CityInMemoryRepository()

  beforeAll(() => {
    //add in-memory cities
    mockCities.forEach((city) => {
      repository.addCity(city)
    })
  })

  it('should return an empty list when no city is found', async () => {
    const query = 'Aa'

    const listCitiesUseCase = new ListCitiesUseCase(repository)

    const cities = await listCitiesUseCase.execute(query)

    expect(cities).toEqual([])
  })

  it('should return all cities matching the query', async () => {
    const query = 'H'
    const toHaveLengthOf5 = 5

    const listCitiesUseCase = new ListCitiesUseCase(repository)
    const cities = await listCitiesUseCase.execute(query)

    const citiesWithHInIt = mockCities.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    )

    expect(cities).toHaveLength(toHaveLengthOf5)
    expect(cities).toEqual(citiesWithHInIt)
  })

  it('should return all cities when no search param is specified', async () => {
    const listCitiesUseCase = new ListCitiesUseCase(repository)

    expect(await listCitiesUseCase.execute()).toHaveLength(mockCities.length)
  })
})
