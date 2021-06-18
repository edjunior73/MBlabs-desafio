import { SignUpEventMakerDto } from '@common/dtos'
import { EventMakerLogin } from '@common/models/event-maker-login.model'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { SignUpEventMakerCommand } from '../cqrs/commands/sign-up-event-maker/sign-up-event-maker.command'

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
}
