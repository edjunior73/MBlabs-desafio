import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { decode } from 'jsonwebtoken'
import { Reflector } from '@nestjs/core'
import { Context, Role } from '../types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext() as Context
    const token = ctx.req.headers.authorization as string

    const user = decode(token?.split(' ')[1]) as Context['user']

    if (!user) throw new UnauthorizedException()

    const roles = this.reflector.get<Role[]>('roles', context.getHandler())

    if (!roles) return true

    if (!roles.includes(user.role)) {
      throw new UnauthorizedException()
    }

    return true
  }
}
