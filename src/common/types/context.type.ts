import { Request } from 'express'

export interface JUser {
  iss: string
  email: string
  id: string
  /**
   * User Id
   */
  sub: string
  iat: number
  exp: number
}

export interface Context {
  req: Request
  user?: JUser | null
}
