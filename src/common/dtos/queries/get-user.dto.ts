import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class GetUserDto {
  @Field()
  @IsEmail()
  email: string
}
