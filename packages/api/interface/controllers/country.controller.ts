import { ApplicationError } from 'domain/utils/error'
import { constants } from 'http2'
import { CountryContainer } from 'infrastructure/containers/country-container'
import { Applogger } from 'shared'
import { ExpressContext } from 'types/express'
import { FindCountryUseCase } from 'use-cases/country/find-country'
import { ListCountriesUseCase } from 'use-cases/country/list-countries'

export class CountryController {
  private listCountriesUseCase: ListCountriesUseCase
  private findCountryUseCase: FindCountryUseCase

  constructor(readonly countryContainer: CountryContainer) {
    this.listCountriesUseCase = countryContainer.getListCountriesUseCase()
    this.findCountryUseCase = countryContainer.getFindCountryUseCase()
  }

  async listCountries({
    request,
    response,
    next,
  }: ExpressContext): Promise<void> {
    try {
      const { country } = request.query
      const countries = await this.listCountriesUseCase.execute(
        country?.toString(),
      )

      response.status(constants.HTTP_STATUS_OK).json(countries)
    } catch (error) {
      next(error)
    }
  }

  async getCountry({ request, response, next }: ExpressContext): Promise<void> {
    const { id } = request.params
    try {
      const country = await this.findCountryUseCase.execute(id)

      if (!country) {
        throw new ApplicationError(
          'Country not found',
          constants.HTTP_STATUS_NOT_FOUND,
        )
      }

      response.status(constants.HTTP_STATUS_OK).json(country)
    } catch (err) {
      if (!(err instanceof ApplicationError)) {
        throw Error('Error while getting city. please check the logs')
      }

      Applogger.error({ err, 'thm.country.id': id }, 'Application error')

      next(err)
    }
  }
}
