import { ApplicationError } from 'domain/utils/error'
import { constants } from 'http2'
import { CityContainer } from 'infrastructure/containers/city-container'
import { Applogger } from 'shared'
import { ExpressContext } from 'types/express'
import { FindCityUseCase } from 'use-cases/city/find-city'
import { ListCitiesUseCase } from 'use-cases/city/list-cities'

export class CityController {
  private listCitiesUseCase: ListCitiesUseCase
  private findCityUseCase: FindCityUseCase

  constructor(readonly cityContainer: CityContainer) {
    this.listCitiesUseCase = cityContainer.getListCitiesUseCase()
    this.findCityUseCase = cityContainer.getFindCityUseCase()
  }

  async listCities({ request, response, next }: ExpressContext): Promise<void> {
    try {
      const { city } = request.query
      const cities = await this.listCitiesUseCase.execute(city?.toString())

      response.status(constants.HTTP_STATUS_OK).json(cities)
    } catch (error) {
      next(error)
    }
  }

  async getCity({ request, response, next }: ExpressContext): Promise<void> {
    const { id } = request.params

    try {
      const city = await this.findCityUseCase.execute(id)

      if (!city) {
        throw new ApplicationError(
          'City not found',
          constants.HTTP_STATUS_NOT_FOUND,
        )
      }

      response.status(constants.HTTP_STATUS_OK).json(city)
    } catch (err) {
      if (!(err instanceof ApplicationError)) {
        throw Error('Error while getting city. please check the logs')
      }
      Applogger.warn({ err, 'thm.city.id': id }, 'Application error')
      next(err)
    }
  }
}
