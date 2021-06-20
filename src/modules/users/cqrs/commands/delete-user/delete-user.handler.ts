import { UserRepository } from '@modules/users/repositories'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from './delete-user.command'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ userId }: DeleteUserCommand) {
    const deletedUser = this.userRepository.deleteUser(userId)
    return deletedUser
  }
}
