import { UserRepository } from '@modules/users/repositories/user.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from './get-user.query'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ input }: GetUserQuery) {
    const getUser = this.userRepository.getUser(input.email)
    
    return getUser
  }
}
