import { SignUpUserDto } from '@common/dtos'

export class SignUpUserCommand {
  constructor(public readonly input: SignUpUserDto) {}
}
