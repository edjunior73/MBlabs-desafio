import { Module } from '@nestjs/common'
import { GraphQLModule } from './graphql'
import { EventMakerRepository } from './repositories/event-maker.repository'

@Module({
  imports: [GraphQLModule],
  providers: [EventMakerRepository]
})
export class EventMakerModule {}
