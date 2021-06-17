import { Module } from '@nestjs/common'
import { GraphQLModule } from './graphql'
import { EventRepository } from './repositories/event.repository'
import { TicketRepository } from './repositories/ticket.repository'

@Module({
  imports: [GraphQLModule],
  providers: [EventRepository, TicketRepository]
})
export class EventModule {}
