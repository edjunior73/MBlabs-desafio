import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService } from '@modules/prisma'
import { EventMaker } from '@common/models/event-maker.model'

@Injectable()
export class EventMakerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.EventMakerCreateInput): Promise<EventMaker> {
    const user = await this.prismaService.eventMaker.create({ data: input })
    return user as EventMaker
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.eventMaker.findUnique({ where: { email } })
    return user
  }

  async findByCnpj(cnpj: string) {
    const user = await this.prismaService.eventMaker.findUnique({ where: { cnpj } })
    return user
  }
}
