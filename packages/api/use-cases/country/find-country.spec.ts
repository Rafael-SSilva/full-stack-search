/* eslint-disable require-await */
import { CountryInMemoryRepository } from '../../infrastructure/repositories/in-memory/country.repository'
import { mockCountries } from '../../use-cases/__mocks__/country'
import { FindCountryUseCase } from './find-country'

describe('Find Country use case', () => {
  const repository = new CountryInMemoryRepository()

  beforeAll(() => {
    //add in-memory countries
    mockCountries.forEach((country) => {
      repository.addCountry(country)
    })
  })

  it('should throw when repository find any error', async () => {
    const errorMessage = 'Repository Error'
    const throwRepository = new CountryInMemoryRepository({
      message: errorMessage,
    })
    const findCountryUseCase = new FindCountryUseCase(throwRepository)

    expect(async () => await findCountryUseCase.execute('a')).rejects.toThrow(
      errorMessage,
    )
  })

  it('should return null when country is not found', async () => {
    const findCountryUseCase = new FindCountryUseCase(repository)

    expect(await findCountryUseCase.execute('a')).toBeNull()
  })

  it('should return the country object when it is found', async () => {
    const findCountryUseCase = new FindCountryUseCase(repository)

    const [firstCountry] = mockCountries

    expect(await findCountryUseCase.execute(firstCountry._id)).toEqual(
      firstCountry,
    )
  })

  // it('should return an empty list when no country is found', async () => {
  //     const query = 'Aa'
  //     const counties = await repository.findAll(query)

  //     expect(counties).toEqual([])
  // })

  // it('should return all counties matching the query', async () => {
  //     const query = 'Chi'
  //     const counties = await repository.findAll(query)
  //     const toHaveLengthOf2 = 2

  //     const startingWithChCountries = mockCountries.filter(c => c.country.includes(query))

  //     expect(counties).toHaveLength(toHaveLengthOf2)
  //     expect(counties).toEqual(startingWithChCountries)
  // })

  // it('should return all counties when no search param is specified', async () => {
  //     expect(await repository.findAll()).toHaveLength(mockCountries.length)
  // })
})
