import { CountryRepository } from 'domain/interfaces/country.repository'
import { FindCountryUseCase } from 'use-cases/country/find-country'
import { ListCountriesUseCase } from 'use-cases/country/list-countries'

export interface CountryContainer {
  getListCountriesUseCase: () => ListCountriesUseCase
  getFindCountryUseCase: () => FindCountryUseCase
}

export function countryContainer(
  countryRepository: CountryRepository,
): CountryContainer {
  function getListCountriesUseCase(): ListCountriesUseCase {
    return new ListCountriesUseCase(countryRepository)
  }

  function getFindCountryUseCase(): FindCountryUseCase {
    return new FindCountryUseCase(countryRepository)
  }

  return {
    getFindCountryUseCase,
    getListCountriesUseCase,
  }
}
