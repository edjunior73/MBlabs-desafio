import { UserRepository } from '@modules/users/repositories/user.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserByEmailQuery } from './get-user-by-email.query'

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email }: GetUserByEmailQuery) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new Error('Usuário não encontrado')

    return user
  }
}
