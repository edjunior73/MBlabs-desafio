import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

import { CreateEventDto } from '@common/dtos'
import { Event } from '@common/models'

@Injectable()
export class EventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateEventDto): Promise<Event> {
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
}
