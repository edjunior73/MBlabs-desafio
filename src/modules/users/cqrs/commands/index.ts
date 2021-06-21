import { isFunction } from '@common/utils'
import { Provider } from '@nestjs/common'

export * from './sign-up-user'
export * from './login-user'
export * from './update-user'
export * from './delete-user'

export const CommandHandlers = Object.values(exports).filter(
  handler => isFunction(handler) && /handler/i.test(handler.name)
) as Provider[]
