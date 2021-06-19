import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { EventMaker } from '@common/models'
import { EventMakerRepository } from '@modules/event-makers/repositories'
import { GetEventMakerByIdQuery } from './get-event-maker-by-id.query'

@QueryHandler(GetEventMakerByIdQuery)
export class GetEventMakerByIdHandler
  implements IQueryHandler<GetEventMakerByIdQuery, EventMaker | null>
{
  constructor(private readonly eventMakerRepository: EventMakerRepository) {}

  async execute({ id }: GetEventMakerByIdQuery): Promise<EventMaker | null> {
    const eventMaker = await this.eventMakerRepository.getEventMakerById(id)
    return eventMaker
  }
}
