import { SignUpEventMakerDto } from '@common/dtos'
import { EventMakerLogin } from '@common/models/event-maker-login.model'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { EventMakerService } from '../services/event-maker.service'

@Resolver()
export class EventMakerResolver {
  constructor(private readonly eventMakerService: EventMakerService) {}

  @Mutation(() => EventMakerLogin)
  signUpEventMaker(@Args('eventMakerInput') input: SignUpEventMakerDto) {
    return this.eventMakerService.signUpEventMaker(input)
  }
}
