import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetEventAnalytics {
  @Field(() => Int)
  availableTickets: number

  @Field(() => Int)
  unavailableTickets: number

  @Field(() => Int)
  totalTickets: number

  @Field(() => Float)
  earnedAmount: number
}
