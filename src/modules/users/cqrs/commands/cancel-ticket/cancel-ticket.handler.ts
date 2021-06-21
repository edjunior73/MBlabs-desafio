import { UserRepository } from '@modules/users/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CancelTicketCommand } from './cancel-ticket.command'

@CommandHandler(CancelTicketCommand)
export class CancelTicketHandler implements ICommandHandler<CancelTicketCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ ticketId, userId }: CancelTicketCommand): Promise<boolean> {
    const ticket = await this.userRepository.cancelTicket(ticketId, userId)
    return !!ticket
  }
}
