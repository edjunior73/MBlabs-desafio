import { SearchEventsFilter } from '@common/dtos'
import { PaginationParams } from '@common/types'

export type EventPaginationParams = Partial<PaginationParams & SearchEventsFilter>
