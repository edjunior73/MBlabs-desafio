import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsNumber, IsString, IsPositive, IsOptional } from 'class-validator'
import { FieldId } from '@common/decorators'

@InputType()
export class CreateTicketDto {
  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  count?: number

  @FieldId()
  eventId: string

  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string
}
