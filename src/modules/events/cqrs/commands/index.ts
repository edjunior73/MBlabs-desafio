import { isFunction } from '@common/utils'
import { Provider } from '@nestjs/common'

export * from './create-event'
export * from './create-ticket'
export * from './cancel-event'
export * from './buy-ticket'
export * from './cancel-ticket'

export const CommandHandlers = Object.values(exports).filter(
  handler => isFunction(handler) && /handler/i.test(handler.name)
) as Provider[]
