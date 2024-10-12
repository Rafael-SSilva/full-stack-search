import { constants } from 'http2'

export class ApplicationError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = constants.HTTP_STATUS_BAD_REQUEST) {
    this.message = message
    this.statusCode = statusCode
  }
}
