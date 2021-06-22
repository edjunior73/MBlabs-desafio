import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService } from '@modules/prisma'
import { CreateEventDto, UpdateEventDto } from '@common/dtos'
import { Event, PaginatedEvents } from '@common/models'
import { BaseRepository } from '@common/classes/base-repository.class'
import { EventPaginationParams } from '../types'

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(private readonly prismaService: PrismaService) {
    super()
  }

  async create(input: CreateEventDto): Promise<Event> {
    if (input.date.getTime() < Date.now())
      throw new Error('Você não pode criar eventos no passado!')
    const event = await this.prismaService.event.create({ data: input })
    return event
  }

  async getEventAnalytics(eventId: string, eventMakerId: string) {
    const event = await this.prismaService.event.findMany({
      where: { id: eventId, ownerId: eventMakerId }
    })
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

  async getPaginatedEvents(params: EventPaginationParams = {}): Promise<PaginatedEvents> {
    const page = this.getPage(params.page)
    const pageSize = this.getPageSize(params.pageSize)

    const { minPrice, maxPrice, categoryId, name } = params

    const findManyEventArgs: Prisma.EventFindManyArgs = {
      where: {
        OR: [
          minPrice || maxPrice
            ? {
                tickets: {
                  some: {
                    price: {
                      lte: maxPrice,
                      gte: minPrice
                    }
                  }
                }
              }
            : null,
          categoryId
            ? {
                categoryId
              }
            : null,
          name ? { name: { contains: name, mode: 'insensitive' } } : null
        ].filter(Boolean) as Prisma.EventWhereInput
      },
      take: pageSize,
      skip: this.getPaginationOffset({ page, pageSize })
    }

    if (
      Array.isArray(findManyEventArgs.where?.OR) &&
      findManyEventArgs.where?.OR.length === 0
    ) {
      delete findManyEventArgs.where.OR
    }

    const count = await this.prismaService.event.count({
      where: findManyEventArgs.where
    })

    const events: Event[] = await this.prismaService.event.findMany(findManyEventArgs)
    return this.createPaginationPayload({
      data: events,
      count,
      page,
      pageSize
    })
  }

  async updateEvent(input: UpdateEventDto, eventId: string): Promise<Event> {
    const updatedEvent = await this.prismaService.event.update({
      data: input,
      where: {
        id: eventId
      }
    })
    return updatedEvent
  }

  async cancelEvent(eventId: string, eventMakerId: string): Promise<boolean> {
    let i = 0
    const event = await this.prismaService.event.findUnique({ where: { id: eventId } })

    if (!event) throw new Error('Este evento não existe')
    if (event?.date?.getTime() < Date.now()) throw new Error('Este evento já ocorreu!')

    const tickets = await this.prismaService.ticket.findMany({
      where: { eventId }
    })
    while (tickets[i] !== undefined) {
      const deletedRelations = await this.prismaService.userEvent.deleteMany({
        where: { ticketId: tickets[i].id }
      })
      i += 1
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
