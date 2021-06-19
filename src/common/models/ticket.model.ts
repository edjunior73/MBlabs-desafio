import { FieldId } from '@common/decorators'
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Ticket {
  @FieldId()
  id: string

  @Field(() => Float)
  price: number

  @Field(() => Int, { nullable: true })
  count?: number | null

  @Field()
  eventId: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string
}
