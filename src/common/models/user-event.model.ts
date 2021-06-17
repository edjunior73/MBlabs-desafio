import { FieldId } from '@common/decorators'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Category {
  @FieldId()
  userId: string

  @FieldId()
  ticketId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
