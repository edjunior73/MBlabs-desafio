import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { decode } from 'jsonwebtoken'
import { Context } from '../types/context.type'

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext() as Context
  const token = ctx.req.headers.authorization as string

  const user = decode(token?.split(' ')[1]) as Context['user']

  return !user ? null : { ...user, id: user.sub }
})
