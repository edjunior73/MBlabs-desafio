import { Injectable } from '@nestjs/common'
import { Prisma, PrismaService, User as PrismaUser } from '@modules/prisma'
import { User, UserEvent } from '@common/models'
import { UpdateUserDto } from '@common/dtos'
import { getNonNullKeys } from '@common/utils'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.create({ data: input })
    return this.formatUser(user) as User
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    return this.formatUser(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return this.formatUser(user)
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { cpf } })
    return this.formatUser(user)
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prismaService.user.count({
      where: {
        id
      }
    })
    return count > 0
  }

  async updateUser(input: Prisma.UserUpdateInput, userId: string): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      data: input,
      where: {
        id: userId
      }
    })
    return this.formatUser(updatedUser) as User
  }

  async buyTicket(ticketId: string, userId: string): Promise<UserEvent> {
    const ticket = await this.prismaService.ticket.findUnique({
      where: { id: ticketId }
    })
    if (ticket) {
      if (ticket.count === 0) throw new Error('Ticket esgotado!')
    }
    const updateTicket = await this.prismaService.ticket.update({
      data: { count: { decrement: 1 } },
      where: {
        id: ticketId
      }
    })
    const userTicket = await this.prismaService.userEvent.create({
      data: { ticketId, userId }
    })
    return userTicket as UserEvent
  }

  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await this.prismaService.user.delete({ where: { id: userId } })
    return !!deletedUser
  }

  private formatUser(user: PrismaUser | null): User | null {
    if (user !== null) {
      return getNonNullKeys(user)
    }
    return null
  }
}
