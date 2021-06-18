import { Provider } from '@nestjs/common'
import { isFunction } from '@common/utils'

export * from './created-account'

export const EventHandlers = Object.values(exports).filter(
  handler => isFunction(handler) && /handler/i.test(handler.name)
) as Provider[]
