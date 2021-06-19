import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  oldPassword?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  newPassword?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  photoUrl?: string

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  birthday?: Date
}
