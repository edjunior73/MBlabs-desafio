import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthUser, Roles } from '@common/decorators'
import { CreateTicketDto } from '@common/dtos'
import { AuthGuard } from '@common/guards'
import { Ticket, UserEvent } from '@common/models'
import { JUser, Role } from '@common/types'
import { TicketService } from '../services'

@Resolver()
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  // @Query(() => [Ticket])
  // getEvents() {
  //   return this.ticketService.getEvents()
  // }

  @Mutation(() => Ticket)
  @UseGuards(AuthGuard)
  @Roles(Role.EVENT_MAKER)
  createTicket(@Args('ticketInput') input: CreateTicketDto, @AuthUser() user: JUser) {
    return this.ticketService.createTicket(input, user.id)
  }
  @Mutation(() => UserEvent)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  buyTicket(@Args('ticketId') ticketId: string, @AuthUser() user: JUser) {
    return this.ticketService.buyTicket(ticketId, user.id)
  }
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  cancelTicket(@Args('ticketId') ticketId: string, @AuthUser() user: JUser) {
    return this.ticketService.cancelTicket(ticketId, user.id)
  }
}
