import { GetUserDto, SignUpUserDto } from '@common/dtos'
import { UserLogin } from '@common/models/user-login.model'
import { User } from '@common/models/user.model'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { GetUserQuery } from '../cqrs'
import { SignUpUserCommand } from '../cqrs/commands/sign-up'

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  signUpUser(input: SignUpUserDto): Promise<UserLogin> {
    return this.commandBus.execute(new SignUpUserCommand(input))
  }

  getUser(input: GetUserDto): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(input))
  }
}