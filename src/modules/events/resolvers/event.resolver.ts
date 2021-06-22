import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateEventDto, SearchEventsArgs, UpdateEventDto } from '@common/dtos'
import { Event, GetEventAnalytics, PaginatedEvents } from '@common/models'
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

  @Query(() => GetEventAnalytics)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  getEventAnalytics(@Args('eventId') eventId: string, @AuthUser() user: JUser) {
    return this.eventService.getEventAnalytics(eventId, user.id)
  }

  @Query(() => PaginatedEvents)
  getPaginatedEvents(@Args({ type: () => SearchEventsArgs }) args: SearchEventsArgs) {
    return this.eventService.getPaginatedEvents(args)
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

  @Mutation(() => Event)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  updateEvent(
    @Args('updateEventInput') input: UpdateEventDto,
    @Args('eventId') eventId: string
  ) {
    return this.eventService.updateEvent(input, eventId)
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  cancelEvent(@Args('eventId') eventId: string, @AuthUser() user: JUser) {
    return this.eventService.cancelEvent(eventId, user.id)
  }
}
