import { isFunction } from '@common/utils'
import { Provider } from '@nestjs/common'

export * from './get-events'
export * from './get-event-analytics'
export * from './search-events'

export const QueryHandlers = Object.values(exports).filter(
  handler => isFunction(handler) && /handler/i.test(handler.name)
) as Provider[]
