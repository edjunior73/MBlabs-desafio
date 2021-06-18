import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EventMakerRepository } from './repositories/event-maker.repository'

@Module({
  imports: [CqrsModule],
  providers: [EventMakerRepository]
})
export class EventMakerModule {}
