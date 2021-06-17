import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

@Injectable()
export class EventMakerRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
