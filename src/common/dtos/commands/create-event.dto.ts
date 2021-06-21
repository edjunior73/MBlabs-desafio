import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsString, IsDate } from 'class-validator'
import { FieldId } from '@common/decorators'

@InputType()
export class CreateEventDto {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  description: string

  @FieldId()
  categoryId: string

  @Field()
  @IsString()
  place: string

  @Field()
  @IsDate()
  date: Date

  @Field({ defaultValue: false })
  @IsBoolean()
  isPaid: boolean

  ownerId: string
}
