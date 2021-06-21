import { AuthUser, Roles } from '@common/decorators'
import { SignUpEventMakerDto, LoginDto } from '@common/dtos'
import { AuthGuard } from '@common/guards'
import { EventMaker } from '@common/models'
import { EventMakerLogin } from '@common/models/event-maker-login.model'
import { JUser, Role } from '@common/types'
import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql'
import { EventMakerService } from '../services/event-maker.service'

@Resolver()
export class EventMakerResolver {
  constructor(private readonly eventMakerService: EventMakerService) {}

  @Query(() => EventMaker, { name: 'eventMakerById', nullable: true })
  getEventMakerById(@Args('eventMakerId', { type: () => ID }) id: string) {
    return this.eventMakerService.getEventMakerById(id)
  }

  @Mutation(() => EventMakerLogin)
  async signUpEventMaker(@Args('eventMakerInput') input: SignUpEventMakerDto) {
    return this.eventMakerService.signUpEventMaker(input)
  }
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  deleteEventMaker(@AuthUser() eventMaker: JUser) {
    return this.eventMakerService.deleteEventMaker(eventMaker.id)
  }

  @Mutation(() => EventMakerLogin)
  async loginEventMaker(@Args('eventMakerInput') input: LoginDto) {
    return this.eventMakerService.loginEventMaker(input)
  }
}
