import { EventRepository, TicketRepository } from '@modules/events/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CancelEventCommand } from './cancel-event.command'

@CommandHandler(CancelEventCommand)
export class CancelEventHandler implements ICommandHandler<CancelEventCommand> {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute({ eventId, eventMakerId }: CancelEventCommand): Promise<boolean> {
    const ticket = await this.eventRepository.cancelEvent(eventId, eventMakerId)
    return !!ticket
  }
}
