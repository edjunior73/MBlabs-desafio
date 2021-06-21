import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService, EventMaker as PrismaEventMaker } from '@modules/prisma'
import { EventMaker } from '@common/models/event-maker.model'
import { getNonNullKeys } from '@common/utils'

@Injectable()
export class EventMakerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.EventMakerCreateInput): Promise<EventMaker> {
    const eventMaker = await this.prismaService.eventMaker.create({ data: input })
    return this.formatEventMaker(eventMaker) as EventMaker
  }

  async findByEmail(email: string): Promise<EventMaker | null> {
    const eventMaker = await this.prismaService.eventMaker.findUnique({ where: { email } })
    return this.formatEventMaker(eventMaker)
  }

  async findByCnpj(cnpj: string): Promise<EventMaker | null> {
    const eventMaker = await this.prismaService.eventMaker.findUnique({ where: { cnpj } })
    return this.formatEventMaker(eventMaker)
  }

  async getEventMakerById(id: string): Promise<EventMaker | null> {
    const eventMaker = await this.prismaService.eventMaker.findUnique({ where: { id } })
    return this.formatEventMaker(eventMaker)
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prismaService.eventMaker.count({
      where: {
        id
      }
    })
    return count > 0
  }

  async deleteEventMaker(eventMakerId: string): Promise<boolean> {
    let i = 0
    const events = await this.prismaService.event.findMany({
      where: { ownerId: eventMakerId }
    })

    while (events[i] !== undefined) {
      const deletedTickets = await this.prismaService.ticket.deleteMany({
        where: { eventId: events[i].id }
      })
      i += 1
    }

    const deletedEvents = await this.prismaService.event.deleteMany({
      where: { ownerId: eventMakerId }
    })
    const deletedUser = await this.prismaService.eventMaker.delete({
      where: { id: eventMakerId }
    })

    return !!deletedUser
  }

  private formatEventMaker(eventMaker: PrismaEventMaker | null): EventMaker | null {
    if (eventMaker !== null) {
      return getNonNullKeys(eventMaker)
    }
    return null
  }
}
