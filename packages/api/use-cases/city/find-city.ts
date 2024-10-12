import { CityRepository } from 'domain/interfaces/city.repository'
import { ApplicationError } from 'domain/utils/error'
import { City } from 'shared'

export class FindCityUseCase {
  private cityRepository: CityRepository

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository
  }

  async execute(cityId: string): Promise<City | null> {
    try {
      return await this.cityRepository.findById(cityId)
    } catch (err) {
      if (!(err instanceof ApplicationError)) {
        throw Error('Error while getting city. Please check the logs')
      }

      throw err
    }
  }
}
