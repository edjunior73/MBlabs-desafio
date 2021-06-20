import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EventMakerModule } from '@modules/event-makers'
import { CategoryModule } from '@modules/categories'
import { CommandHandlers, QueryHandlers } from './cqrs'
import { EventRepository, TicketRepository } from './repositories'
import { EventResolver, TicketResolver } from './resolvers'
import { EventService, TicketService } from './services'

@Module({
  imports: [CqrsModule, EventMakerModule, CategoryModule],
  providers: [
    EventRepository,
    EventService,
    EventResolver,
    TicketResolver,
    TicketRepository,
    TicketService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class EventModule {}
