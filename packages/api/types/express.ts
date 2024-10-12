import type { NextFunction, Request, Response } from 'express'

export interface ExpressContext {
  request: Request
  response: Response
  next: NextFunction
}
