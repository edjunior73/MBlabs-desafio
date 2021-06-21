import { CreateTicketDto } from '@common/dtos'
import { Ticket, UserEvent } from '@common/models'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { BuyTicketCommand } from '../cqrs/commands/buy-ticket'
import { CancelTicketCommand } from '../cqrs/commands/cancel-ticket'
import { CreateTicketCommand } from '../cqrs/commands/create-ticket/create-ticket.command'

@Injectable()
export class TicketService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  createTicket(input: CreateTicketDto, eventMakerId: string): Promise<Ticket> {
    return this.commandBus.execute(new CreateTicketCommand(input, eventMakerId))
  }
  buyTicket(ticketId: string, userId: string): Promise<UserEvent> {
    return this.commandBus.execute(new BuyTicketCommand(ticketId, userId))
  }
  cancelTicket(ticketId: string, userId: string) {
    return this.commandBus.execute(new CancelTicketCommand(ticketId, userId))
  }
}
