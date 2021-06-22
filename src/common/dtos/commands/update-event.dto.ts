import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsString, IsDate, IsOptional } from 'class-validator'
import { FieldId } from '@common/decorators'

@InputType()
export class UpdateEventDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @FieldId({ nullable: true })
  @IsOptional()
  categoryId?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  place?: string

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  date?: Date

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean

  ownerId: string
}
