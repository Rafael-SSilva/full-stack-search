import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { Applogger } from 'shared'

import { ApplicationError } from './error'

export function errorHandler(
  err: Error,
  req: Request,
  response: Response,
  __: NextFunction,
): void {
  if (err instanceof ApplicationError) {
    response.status(err.statusCode).send({
      message: err.message,
      statusCode: err.statusCode,
    })

    return
  }

  Applogger.warn({ err, req }, 'The system encoutered an error')

  response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
    message: 'Internal server error',
    statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
  })
}
