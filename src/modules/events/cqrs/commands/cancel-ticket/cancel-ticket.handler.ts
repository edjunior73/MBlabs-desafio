import { TicketRepository } from '@modules/events/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CancelTicketCommand } from './cancel-ticket.command'

@CommandHandler(CancelTicketCommand)
export class CancelTicketHandler implements ICommandHandler<CancelTicketCommand> {
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute({ ticketId, userId }: CancelTicketCommand): Promise<boolean> {
    const ticket = await this.ticketRepository.cancelTicket(ticketId, userId)
    return !!ticket
  }
}
