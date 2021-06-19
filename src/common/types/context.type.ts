import { Request } from 'express'

export enum Role {
  EVENT_MAKER,
  USER
}

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
  role: Role
}

export interface Context {
  req: Request
  user?: JUser | null
}
