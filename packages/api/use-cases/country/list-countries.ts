import { CountryRepository } from 'domain/interfaces/country.repository'
import { Applogger, Country } from 'shared'

export class ListCountriesUseCase {
  private countryRepository: CountryRepository

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository
  }

  async execute(search?: string): Promise<Country[]> {
    try {
      return await this.countryRepository.findAll(search)
    } catch (err) {
      Applogger.error(
        { err, 'thm.country.search': search },
        'ListCountriesUseCase error',
      )
      throw Error('Error while listing contries. Please check the logs')
    }
  }
}
