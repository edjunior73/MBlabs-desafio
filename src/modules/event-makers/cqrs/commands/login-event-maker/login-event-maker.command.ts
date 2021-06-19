import { LoginDto } from '@common/dtos'

export class LoginEventMakerCommand {
  constructor(public input: LoginDto) {}
}
