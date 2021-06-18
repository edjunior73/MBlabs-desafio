import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EventRepository } from './repositories/event.repository'
import { TicketRepository } from './repositories/ticket.repository'

@Module({
  imports: [CqrsModule],
  providers: [EventRepository, TicketRepository]
})
export class EventModule {}
