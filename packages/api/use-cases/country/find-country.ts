import { CountryRepository } from 'domain/interfaces/country.repository'
import { ApplicationError } from 'domain/utils/error'
import { Country } from 'shared'

export class FindCountryUseCase {
  private countryRepository: CountryRepository

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository
  }

  async execute(countryId: string): Promise<Country | null> {
    try {
      return await this.countryRepository.findById(countryId)
    } catch (error) {
      if (!(error instanceof ApplicationError)) {
        throw Error('Error while getting coutry. Please check the logs')
      }

      throw error
    }
  }
}
