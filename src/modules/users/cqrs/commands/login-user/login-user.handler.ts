import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@modules/users/repositories'
import { CryptService } from '@common/services'
import { UserLogin } from '@common/models'
import { Role } from '@common/types'
import { LoginUserCommand } from './login-user.command'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand, UserLogin> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService
  ) {}

  async execute({ input }: LoginUserCommand) {
    const { email, password } = input

    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('Não existe uma conta com esse email')

    const isPasswordCorrect = await this.cryptService.compare(password, user.password)
    if (!isPasswordCorrect) throw new Error('Senha incorreta')

    const token = this.jwtService.sign({ email, role: Role.USER }, { subject: user.id })

    return {
      token,
      user
    }
  }
}
