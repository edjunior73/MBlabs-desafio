import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

import { CreateEventDto } from '@common/dtos'
import { Event } from '@common/models'

@Injectable()
export class EventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateEventDto): Promise<Event> {
    if (input.date.getTime() < Date.now())
      throw new Error('Você não pode criar eventos no passado!')
    const event = await this.prismaService.event.create({ data: input })
    return event
  }

  async findByName(name: string): Promise<Event | null> {
    const event = await this.prismaService.event.findUnique({ where: { name } })
    return event
  }

  async findById(id: string): Promise<Event | null> {
    const event = await this.prismaService.event.findUnique({ where: { id } })
    return event
  }

  async getEvents(): Promise<Event[]> {
    const events = await this.prismaService.event.findMany()
    return events
  }

  async cancelEvent(eventId: string, eventMakerId: string): Promise<boolean> {
    let i2 = 0
    const event = await this.prismaService.event.findUnique({ where: { id: eventId } })

    if (!event) throw new Error('Este evento não existe')
    if (event?.date?.getTime() < Date.now()) throw new Error('Este evento já ocorreu!')

    const tickets = await this.prismaService.ticket.findMany({
      where: { eventId }
    })
    while (tickets[i2] !== undefined) {
      const deletedRelations = await this.prismaService.userEvent.deleteMany({
        where: { ticketId: tickets[i2].id }
      })
      i2 += 1
    }
    const deletedTickets = await this.prismaService.ticket.deleteMany({
      where: { eventId }
    })

    const canceledEvent = await this.prismaService.event.deleteMany({
      where: { id: eventId, ownerId: eventMakerId }
    })
    return !!canceledEvent
  }
}
