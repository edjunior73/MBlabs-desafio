import { UserRepository } from '@modules/users/repositories'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserEventsQuery } from './get-user-events.query'

@QueryHandler(GetUserEventsQuery)
export class GetUserEventsHandler implements IQueryHandler<GetUserEventsQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: GetUserEventsQuery) {
    const user = await this.userRepository.getUserEvents(userId)

    return user
  }
}
