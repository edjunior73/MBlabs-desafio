import { EventRepository } from '@modules/events/repositories'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetEventsQuery } from './get-events.query'

@QueryHandler(GetEventsQuery)
export class GetEventsHandler implements IQueryHandler {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute() {
    const getEvents = await this.eventRepository.getEvents()

    return getEvents
  }
}
