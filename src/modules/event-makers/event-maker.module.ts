import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs'
import { EventMakerRepository } from './repositories'
import { EventMakerResolver } from './resolvers'
import { ServicesModule, EventMakerService } from './services'

@Module({
  imports: [ServicesModule, CqrsModule],
  providers: [
    EventMakerRepository,
    EventMakerService,
    EventMakerResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers
  ],
  exports: [EventMakerRepository, EventMakerService]
})
export class EventMakerModule {}
