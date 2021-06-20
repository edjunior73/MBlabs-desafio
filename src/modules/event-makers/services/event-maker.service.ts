import { SignUpEventMakerDto, LoginDto } from '@common/dtos'
import { EventMakerLogin } from '@common/models/event-maker-login.model'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { SignUpEventMakerCommand, LoginEventMakerCommand } from '../cqrs/commands'
import { GetEventMakerByIdQuery } from '../cqrs/queries'

@Injectable()
export class EventMakerService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  signUpEventMaker(input: SignUpEventMakerDto): Promise<EventMakerLogin> {
    return this.commandBus.execute(new SignUpEventMakerCommand(input))
  }

  loginEventMaker(input: LoginDto): Promise<EventMakerLogin> {
    return this.commandBus.execute(new LoginEventMakerCommand(input))
  }

  getEventMakerById(id: string) {
    return this.queryBus.execute(new GetEventMakerByIdQuery(id))
  }
}
