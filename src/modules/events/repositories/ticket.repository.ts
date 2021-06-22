import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService, Ticket as PrismaTicket } from '@modules/prisma'
import { Ticket, UserEvent } from '@common/models'
import { getNonNullKeys } from '@common/utils'

@Injectable()
export class TicketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(input: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    const ticket = await this.prismaService.ticket.create({ data: input })
    return this.formatTicket(ticket) as Ticket
  }

  async findTickets(eventId: string) {
    const tickets = this.prismaService.ticket.findMany({
      where: { eventId },
      select: { count: true, id: true, price: true }
    })
    return tickets
  }

  async getBoughtTickets(ticketsId: string[]): Promise<{ ticketId: string }[]> {
    const tickets = await this.prismaService.userEvent.findMany({
      where: {
        ticketId: {
          in: ticketsId
        }
      },
      select: {
        ticketId: true
      }
    })
    return tickets
  }
  async findByEventAndName(eventId: string, name: string): Promise<Ticket | null> {
    const ticket = await this.prismaService.ticket.findFirst({ where: { eventId, name } })
    return this.formatTicket(ticket)
  }
  async buyTicket(ticketId: string, userId: string): Promise<UserEvent> {
    const ticket2 = await this.prismaService.ticket.findUnique({ where: { id: ticketId } })
    if (!ticket2) throw new Error('Este ticket não existe')

    const ticket = await this.prismaService.ticket.findUnique({
      where: { id: ticketId }
    })
    if (ticket) {
      if (ticket.count === 0) throw new Error('Ticket esgotado!')
    }
    const updateTicket = await this.prismaService.ticket.update({
      data: { count: { decrement: 1 } },
      where: {
        id: ticketId
      }
    })
    const userTicket = await this.prismaService.userEvent.create({
      data: { ticketId, userId }
    })
    return userTicket as UserEvent
  }
  async cancelTicket(ticketId: string, userId: string): Promise<boolean> {
    const ticket = await this.prismaService.ticket.findUnique({ where: { id: ticketId } })
    if (!ticket) throw new Error('Este ticket não existe')
    const canceledTicket = await this.prismaService.userEvent.deleteMany({
      where: {
        userId,
        ticketId
      }
    })
    const updateTicket = await this.prismaService.ticket.update({
      data: { count: { increment: 1 } },
      where: {
        id: ticketId
      }
    })
    return !!canceledTicket
  }

  private formatTicket(ticket: PrismaTicket | null): Ticket | null {
    if (ticket) {
      return getNonNullKeys(ticket)
    }
    return null
  }
}
