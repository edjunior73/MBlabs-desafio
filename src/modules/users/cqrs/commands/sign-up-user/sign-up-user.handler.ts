import { UserRepository } from '@modules/users/repositories/user.repository'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { CryptService } from '@common/services'
import { JwtService } from '@nestjs/jwt'
import { APP_URL } from '@common/constants/server'
import { UserLogin } from '@common/models/user-login.model'
import { Role } from '@common/types/context.type'
import { SignUpUserCommand } from './sign-up-user.command'
import { CreatedAccountEvent } from '../../events/created-account'

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand, UserLogin> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService
  ) {}

  async execute({ input }: SignUpUserCommand) {
    const findEmail = await this.userRepository.findByEmail(input.email)

    if (findEmail) throw new Error('Usuário já existe com esse email!')

    const findCpf = await this.userRepository.findByCpf(input.cpf)

    if (findCpf) throw new Error('Usuário já existe com esse cpf!')

    const hashPassword = await this.cryptService.encrypt(input.password)

    const createdUser = await this.userRepository.create({
      ...input,
      isVerified: false,
      password: hashPassword
    })

    const token = this.jwtService.sign(
      {
        email: createdUser.email,
        role: Role.USER
      },
      {
        subject: createdUser.id
      }
    )

    const link = `${APP_URL}/verify-email?token=${token}`

    this.eventBus.publish(
      new CreatedAccountEvent({ email: createdUser.email, name: createdUser.name, link })
    )

    return {
      token,
      user: createdUser
    }
  }
}
