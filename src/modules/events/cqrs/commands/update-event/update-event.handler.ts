import { Event } from '@common/models'
import { EventRepository } from '@modules/events/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateEventCommand } from './update-event.command'

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand, Event> {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute({ input, eventId }: UpdateEventCommand): Promise<Event> {
    if (input.date && input.date.getTime() < Date.now()) {
      throw new Error('Você não pode ter eventos no passado!')
    }
    const updatedEvent = await this.eventRepository.updateEvent(input, eventId)
    return updatedEvent
  }
}
