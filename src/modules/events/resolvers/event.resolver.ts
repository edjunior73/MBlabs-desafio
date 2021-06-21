import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateEventDto } from '@common/dtos'
import { Event } from '@common/models'
import { Roles, AuthUser } from '@common/decorators'
import { AuthGuard } from '@common/guards'
import { Role, JUser } from '@common/types'
import { EventService } from '../services/event.service'

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  getEvents() {
    return this.eventService.getEvents()
  }

  @Mutation(() => Event)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  createEvent(@Args('createEventInput') input: CreateEventDto, @AuthUser() user: JUser) {
    return this.eventService.createEvent({
      ...input,
      ownerId: user.id
    })
  }
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  cancelEvent(@Args('eventId') eventId: string, @AuthUser() user: JUser) {
    return this.eventService.cancelEvent(eventId, user.id)
  }
}
