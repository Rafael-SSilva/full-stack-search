import { Router } from 'express'

import { cityRoutes } from './city.routes'
import { countryRoutes } from './country.routes'
import { hotelRoutes } from './hotel.routes'

export async function initiateRoutes(): Promise<Router> {
  const router = Router()

  router.use(await countryRoutes())
  router.use(await cityRoutes())
  router.use(await hotelRoutes())

  return router
}
