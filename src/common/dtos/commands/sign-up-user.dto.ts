import { Field, InputType } from '@nestjs/graphql'
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { IsCPF } from 'brazilian-class-validator'

@InputType()
export class SignUpUserDto {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  password: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  photoUrl?: string

  @Field()
  @IsDate()
  birthday: Date

  @Field()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @IsCPF()
  cpf: string
}
