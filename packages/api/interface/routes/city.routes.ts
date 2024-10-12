/*eslint require-await: "off"*/
import { NextFunction, Request, Response, Router } from 'express'
import { cityContainer } from 'infrastructure/containers/city-container'
import { getMongoDBClient } from 'infrastructure/database/mongo/client'
import { MongoCityRepository } from 'infrastructure/repositories/city/city.repository'
import { CityController } from 'interface/controllers/city.controller'

export async function cityRoutes(): Promise<Router> {
  const router = Router()
  const mongoDbClient = getMongoDBClient()
  const controllerContainer = cityContainer(
    new MongoCityRepository(mongoDbClient),
  )

  const cityController = new CityController(controllerContainer)

  const listCities = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => cityController.listCities({ request, response, next })

  const getCityById = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => cityController.getCity({ request, response, next })

  router.get('/cities', listCities)
  router.get('/cities/:id', getCityById)

  return router
}
