import { UpdateUserDto } from '@common/dtos/commands/update-user.dto'

export class UpdateUserCommand {
  constructor(public readonly input: UpdateUserDto, public userId: string) {}
}
