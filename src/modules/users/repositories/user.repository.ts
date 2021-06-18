import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService } from '@modules/prisma'
import { User } from '@common/models/user.model'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.create({ data: input })
    return user as User
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return user
  }

  async findByCpf(cpf: string) {
    const user = await this.prismaService.user.findUnique({ where: { cpf } })
    return user
  }
  async getUser(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return user as User
  }
}
