import { CityRepository } from 'domain/interfaces/city.repository'
import { Applogger, City } from 'shared'

export class ListCitiesUseCase {
  private countryRepository: CityRepository

  constructor(countryRepository: CityRepository) {
    this.countryRepository = countryRepository
  }

  async execute(search?: string): Promise<City[]> {
    try {
      return await this.countryRepository.findAll(search)
    } catch (err) {
      Applogger.error(
        { err, 'thm.city.search': search },
        'ListCitiesUseCase error',
      )
      throw Error('Error while listing cities. Please check the logs')
    }
  }
}
