import { CreateEventDto, SearchEventsArgs, UpdateEventDto } from '@common/dtos'
import { PaginatedEvents } from '@common/models'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { Event } from '@prisma/client'
import {
  CancelEventCommand,
  CreateEventCommand,
  GetEventsQuery,
  SearchEventsQuery
} from '../cqrs'
import { UpdateEventCommand } from '../cqrs/commands/update-event/update-event.command'
import { GetEventAnalyticsQuery } from '../cqrs/queries/get-event-analytics'

@Injectable()
export class EventService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  getEvents(): Promise<Event[]> {
    return this.queryBus.execute(new GetEventsQuery())
  }

  getPaginatedEvents(args: SearchEventsArgs): Promise<PaginatedEvents> {
    return this.queryBus.execute(
      new SearchEventsQuery(args.filter, { page: args.page, pageSize: args.pageSize })
    )
  }

  createEvent(input: CreateEventDto): Promise<Event> {
    return this.commandBus.execute(new CreateEventCommand(input))
  }
  updateEvent(input: UpdateEventDto, eventId: string): Promise<Event> {
    return this.commandBus.execute(new UpdateEventCommand(input, eventId))
  }
  cancelEvent(eventId: string, eventMakerId: string) {
    return this.commandBus.execute(new CancelEventCommand(eventId, eventMakerId))
  }
  getEventAnalytics(eventId: string, eventMakerId: string) {
    return this.queryBus.execute(new GetEventAnalyticsQuery(eventId, eventMakerId))
  }
}
