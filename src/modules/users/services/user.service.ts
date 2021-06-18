import { SignUpUserDto } from '@common/dtos'
import { UserLogin } from '@common/models/user-login.model'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
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
}
