import { isFunction } from '@common/utils'
import { Provider } from '@nestjs/common'

export * from './get-event-maker-by-id'

export const QueryHandlers = Object.values(exports).filter(
  handler => isFunction(handler) && /handler/i.test(handler.name)
) as Provider[]
