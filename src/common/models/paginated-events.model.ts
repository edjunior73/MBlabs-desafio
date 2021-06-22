import { Field, ObjectType } from '@nestjs/graphql'
import { Event } from './event.model'
import { PaginatedList } from './paginated-list.model'

@ObjectType()
export class PaginatedEvents extends PaginatedList<Event> {
  @Field(() => [Event])
  items: Event[]
}
