import { SearchEventsFilter } from '@common/dtos'
import { PaginationParams } from '@common/types'

export class SearchEventsQuery {
  constructor(
    public filter?: SearchEventsFilter,
    public paginationParams?: Partial<PaginationParams>
  ) {}
}
