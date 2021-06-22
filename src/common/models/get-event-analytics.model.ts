import { Field, ObjectType } from '@nestjs/graphql'
import { FieldId } from '@common/decorators'

@ObjectType()
export class GetEventAnalytics {
  @Field()
  availableTickets: number

  @Field()
  unavailableTickets: number

  @FieldId()
  totalTickets: number

  @Field()
  earnedAmount: number
}
