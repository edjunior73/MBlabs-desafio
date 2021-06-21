import { UserEvent } from '@common/models'
import { TicketRepository } from '@modules/events/repositories'

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BuyTicketCommand } from './buy-ticket.command'

@CommandHandler(BuyTicketCommand)
export class BuyTicketHandler implements ICommandHandler<BuyTicketCommand> {
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute({ ticketId, userId }: BuyTicketCommand): Promise<UserEvent> {
    const ticket = await this.ticketRepository.buyTicket(ticketId, userId)
    return ticket
  }
}
