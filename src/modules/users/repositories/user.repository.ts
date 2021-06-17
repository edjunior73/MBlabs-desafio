import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
