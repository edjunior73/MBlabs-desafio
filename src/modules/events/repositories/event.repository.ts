import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

@Injectable()
export class EventRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
