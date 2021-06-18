import { SignUpEventMakerDto } from '@common/dtos'

export class SignUpEventMakerCommand {
  constructor(public readonly input: SignUpEventMakerDto) {}
}
