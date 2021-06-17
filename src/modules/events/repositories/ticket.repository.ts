import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

@Injectable()
export class TicketRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
