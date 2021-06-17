import { FieldId } from '@common/decorators'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @FieldId()
  id: string

  @Field()
  name: string

  @Field()
  password: string

  @Field({ nullable: true })
  photoUrl?: string

  @Field()
  birthday: Date

  @Field()
  cpf: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
