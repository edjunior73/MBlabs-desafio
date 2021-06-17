import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
