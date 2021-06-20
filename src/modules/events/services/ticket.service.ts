import { CreateTicketDto } from '@common/dtos'
import { Ticket } from '@common/models'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
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
}
