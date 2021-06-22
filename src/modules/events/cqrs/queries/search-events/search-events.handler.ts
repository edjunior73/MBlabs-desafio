import { PaginatedEvents } from '@common/models'
import { EventRepository } from '@modules/events/repositories'
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs'
import { SearchEventsQuery } from './search-events.query'

@QueryHandler(SearchEventsQuery)
export class SearchEventsHandler
  implements ICommandHandler<SearchEventsQuery, PaginatedEvents>
{
  constructor(private readonly eventRepository: EventRepository) {}

  async execute({ filter, paginationParams }: SearchEventsQuery): Promise<PaginatedEvents> {
    const eventsPaginated = await this.eventRepository.getPaginatedEvents({
      ...filter,
      ...paginationParams
    })
    return eventsPaginated
  }
}
