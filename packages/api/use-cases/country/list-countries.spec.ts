import { CountryInMemoryRepository } from '../../infrastructure/repositories/in-memory/country.repository'
import { mockCountries } from '../__mocks__/country'
import { ListCountriesUseCase } from './list-countries'

describe('Find Country use case', () => {
  const repository = new CountryInMemoryRepository()

  beforeAll(() => {
    //add in-memory countries
    mockCountries.forEach((country) => {
      repository.addCountry(country)
    })
  })

  it('should return an empty list when no country is found', async () => {
    const query = 'Aa'

    const listCountriesUseCase = new ListCountriesUseCase(repository)

    const counties = await listCountriesUseCase.execute(query)

    expect(counties).toEqual([])
  })

  it('should return all counties matching the query', async () => {
    const query = 'Ch'
    const toHaveLengthOf2 = 2

    const listCountriesUseCase = new ListCountriesUseCase(repository)
    const counties = await listCountriesUseCase.execute(query)

    const startingWithChCountries = mockCountries.filter((c) =>
      c.country.includes(query),
    )

    expect(counties).toHaveLength(toHaveLengthOf2)
    expect(counties).toEqual(startingWithChCountries)
  })

  it('should return all counties when no search param is specified', async () => {
    const listCountriesUseCase = new ListCountriesUseCase(repository)

    expect(await listCountriesUseCase.execute()).toHaveLength(
      mockCountries.length,
    )
  })
})
