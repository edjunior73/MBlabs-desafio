import { Field, ObjectType } from '@nestjs/graphql'
import { FieldId } from '@common/decorators'

@ObjectType()
export class Event {
  @FieldId()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @FieldId()
  categoryId: string

  @Field()
  place: string

  @Field({ defaultValue: false })
  isPaid: boolean

  @FieldId()
  ownerId: string

  @Field()
  date: Date
}
