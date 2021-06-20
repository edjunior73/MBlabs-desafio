import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { CryptService } from '@common/services'
import { User } from '@common/models'
import { UserRepository } from '@modules/users/repositories/user.repository'

import { UpdateUserCommand } from './update-user.command'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService
  ) {}
  async execute({ input, userId }: UpdateUserCommand): Promise<User> {
    const { newPassword, oldPassword, ...rest } = input

    if (oldPassword || newPassword) {
      if (!(oldPassword && newPassword)) {
        if (!oldPassword)
          throw new Error(
            'O campo oldPassword é necessário caso o campo newPassword for inserido'
          )
        if (!newPassword)
          throw new Error(
            'O campo newPassword é necessário caso o campo oldPassword for inserido'
          )
      }

      const user = await this.userRepository.findById(userId)
      if (!user) throw new Error('Usuário não encontrado')

      const isPasswordCorrect = await this.cryptService.compare(oldPassword, user.password)
      if (!isPasswordCorrect) throw new Error('Senha antiga incorreta')

      const hashPassword = await this.cryptService.encrypt(newPassword)

      return this.userRepository.updateUser({ ...rest, password: hashPassword }, userId)
    }
    return this.userRepository.updateUser(input, userId)
  }
}
