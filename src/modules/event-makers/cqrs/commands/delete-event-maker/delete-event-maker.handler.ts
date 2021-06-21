import { EventMakerRepository } from '@modules/event-makers/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteEventMakerCommand } from './delete-event-maker.command'

@CommandHandler(DeleteEventMakerCommand)
export class DeleteEventMakerHandler implements ICommandHandler<DeleteEventMakerCommand> {
  constructor(private readonly eventMakerRepository: EventMakerRepository) {}
  async execute({ eventMakerId }: DeleteEventMakerCommand) {
    const deletedEventMaker = this.eventMakerRepository.deleteEventMaker(eventMakerId)
    return deletedEventMaker
  }
}
