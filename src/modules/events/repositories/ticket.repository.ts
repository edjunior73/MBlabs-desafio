import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService, Ticket as PrismaTicket } from '@modules/prisma'
import { Ticket } from '@common/models'
import { getNonNullKeys } from '@common/utils'

@Injectable()
export class TicketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(input: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    const ticket = await this.prismaService.ticket.create({ data: input })
    return this.formatTicket(ticket) as Ticket
  }

  async findByEventAndName(eventId: string, name: string): Promise<Ticket | null> {
    const ticket = await this.prismaService.ticket.findFirst({ where: { eventId, name } })
    return this.formatTicket(ticket)
  }

  private formatTicket(ticket: PrismaTicket | null): Ticket | null {
    if (ticket) {
      return getNonNullKeys(ticket)
    }
    return null
  }
}
