import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { SignUpUserDto, UpdateUserDto, LoginDto } from '@common/dtos'
import { UserLogin, User, UserEvent } from '@common/models'
import { GetUserByEmailQuery, GetUserEventsQuery } from '../cqrs/queries'
import {
  SignUpUserCommand,
  UpdateUserCommand,
  LoginUserCommand,
  DeleteUserCommand,
  BuyTicketCommand,
  CancelTicketCommand
} from '../cqrs/commands'

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

  loginUser(input: LoginDto): Promise<UserLogin> {
    return this.commandBus.execute(new LoginUserCommand(input))
  }

  updateUser(input: UpdateUserDto, userId: string): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(input, userId))
  }

  getUserByEmail(email: string) {
    return this.queryBus.execute(new GetUserByEmailQuery(email))
  }

  deleteUser(userId: string) {
    return this.commandBus.execute(new DeleteUserCommand(userId))
  }

  buyTicket(ticketId: string, userId: string): Promise<UserEvent> {
    return this.commandBus.execute(new BuyTicketCommand(ticketId, userId))
  }

  getUserEvents(userId: string) {
    return this.queryBus.execute(new GetUserEventsQuery(userId))
  }

  cancelTicket(ticketId: string, userId: string) {
    return this.commandBus.execute(new CancelTicketCommand(ticketId, userId))
  }
}
