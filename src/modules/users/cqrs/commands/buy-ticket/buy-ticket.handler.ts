import { UserEvent } from '@common/models'
import { UserRepository } from '@modules/users/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BuyTicketCommand } from './buy-ticket.command'

@CommandHandler(BuyTicketCommand)
export class BuyTicketHandler implements ICommandHandler<BuyTicketCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ ticketId, userId }: BuyTicketCommand): Promise<UserEvent> {
    const ticket = await this.userRepository.buyTicket(ticketId, userId)
    return ticket
  }
}
