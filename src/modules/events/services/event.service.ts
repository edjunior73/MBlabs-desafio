import { CreateEventDto } from '@common/dtos'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { Event } from '@prisma/client'
import { CancelEventCommand, CreateEventCommand } from '../cqrs'
import { GetEventsQuery } from '../cqrs/queries/get-events/get-events.query'

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
  createEvent(input: CreateEventDto): Promise<Event> {
    return this.commandBus.execute(new CreateEventCommand(input))
  }
  cancelEvent(eventId: string, eventMakerId: string) {
    return this.commandBus.execute(new CancelEventCommand(eventId, eventMakerId))
  }
}
