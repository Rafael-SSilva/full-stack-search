/*eslint require-await: "off"*/

import { NextFunction, Request, Response, Router } from 'express'
import { countryContainer } from 'infrastructure/containers/country-container'
import { getMongoDBClient } from 'infrastructure/database/mongo/client'
import { MongoCountryRepository } from 'infrastructure/repositories/country/country.repository'
import { CountryController } from 'interface/controllers/country.controller'

export async function countryRoutes(): Promise<Router> {
  const router = Router()
  const mongoDbClient = getMongoDBClient()
  const controllerContainer = countryContainer(
    new MongoCountryRepository(mongoDbClient),
  )

  const countryController = new CountryController(controllerContainer)

  const listCountries = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> =>
    countryController.listCountries({ request, response, next })

  const getCountryById = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => countryController.getCountry({ request, response, next })

  router.get('/countries', listCountries)
  router.get('/countries/:id', getCountryById)

  return router
}
