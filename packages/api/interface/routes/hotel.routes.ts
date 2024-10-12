import { NextFunction, Request, Response, Router } from 'express'
import { hotelContainer } from 'infrastructure/containers/hotel-container'
import { getMongoDBClient } from 'infrastructure/database/mongo/client'
import { MongoHotelRepository } from 'infrastructure/repositories/hotel/hotel.repository'
import { HotelController } from 'interface/controllers/hotel.controller'

// eslint-disable-next-line require-await
export async function hotelRoutes(): Promise<Router> {
  const router = Router()
  const mongoDbClient = getMongoDBClient()
  const controllerContainer = hotelContainer(
    new MongoHotelRepository(mongoDbClient),
  )

  const hotelController = new HotelController(controllerContainer)

  const listHotels = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => hotelController.listHotels({ request, response, next })

  const getHotelById = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => hotelController.getHotel({ request, response, next })

  router.get('/hotels', listHotels)
  router.get('/hotels/:id', getHotelById)

  return router
}
