import { LoginDto } from '@common/dtos'

export class LoginUserCommand {
  constructor(public input: LoginDto) {}
}
