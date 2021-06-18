import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers, EventHandlers } from './cqrs'

import { EventMakerRepository } from './repositories/event-maker.repository'
import { EventMakerResolver } from './resolver/event-maker.resolver'
import { ServicesModule } from './services'
import { EventMakerService } from './services/event-maker.service'

@Module({
  imports: [ServicesModule, CqrsModule],
  providers: [
    EventMakerRepository,
    EventMakerService,
    EventMakerResolver,
    ...CommandHandlers,
    ...EventHandlers
  ]
})
export class EventMakerModule {}
