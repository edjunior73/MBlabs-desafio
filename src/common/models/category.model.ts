import { FieldId } from '@common/decorators'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Category {
  @FieldId()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
