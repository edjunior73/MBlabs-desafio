import { FieldId } from '@common/decorators'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class EventMaker {
  @FieldId()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field()
  cnpj: string

  @Field({ nullable: true })
  photoUrl?: string

  @Field()
  password: string

  @Field()
  email: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
