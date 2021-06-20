import { Ticket } from '@common/models'
import { EventRepository, TicketRepository } from '@modules/events/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTicketCommand } from './create-ticket.command'

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler implements ICommandHandler<CreateTicketCommand, Ticket> {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly eventRepository: EventRepository
  ) {}

  async execute({ input, eventMakerId }: CreateTicketCommand): Promise<Ticket> {
    const event = await this.eventRepository.findById(input.eventId)

    if (!event) throw new Error('Esse evento não existe')

    if (event.ownerId !== eventMakerId) throw new Error('Esse evento não pertence a você!')

    const existsTicket = await this.ticketRepository.findByEventAndName(
      input.eventId,
      input.name
    )

    if (existsTicket) throw new Error('Esse ticket já existe nesse evento')

    const ticket = await this.ticketRepository.createTicket(input)

    return ticket
  }
}
