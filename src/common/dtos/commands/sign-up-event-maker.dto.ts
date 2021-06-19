import { Field, InputType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

@InputType()
export class SignUpEventMakerDto {
  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string

  @Field()
  @IsString()
  password: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  photoUrl?: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @MaxLength(14)
  @MinLength(14)
  cnpj: string
}
