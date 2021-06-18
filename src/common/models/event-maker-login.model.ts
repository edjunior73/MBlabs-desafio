import { Field, ObjectType } from '@nestjs/graphql'
import { EventMaker } from './event-maker.model'

@ObjectType()
export class EventMakerLogin {
  @Field(() => String)
  token: string

  @Field(() => EventMaker)
  eventMaker: EventMaker
}
