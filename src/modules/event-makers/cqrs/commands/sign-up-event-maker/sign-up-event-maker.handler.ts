import { APP_URL } from '@common/constants/server'
import { EventMakerLogin } from '@common/models'
import { CryptService } from '@common/services'
import { EventMakerRepository } from '@modules/event-makers/repositories'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@common/types'
import { CreatedEventMakerEvent } from '../../events/created-event-maker'
import { SignUpEventMakerCommand } from './sign-up-event-maker.command'

@CommandHandler(SignUpEventMakerCommand)
export class SignUpEventMakerHandler
  implements ICommandHandler<SignUpEventMakerCommand, EventMakerLogin>
{
  constructor(
    private readonly eventMakerRepository: EventMakerRepository,
    private readonly cryptService: CryptService,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService
  ) {}

  async execute({ input }: SignUpEventMakerCommand): Promise<EventMakerLogin> {
    const findEmail = await this.eventMakerRepository.findByEmail(input.email)

    if (findEmail) throw new Error('Usuário já existe com esse email!')

    const findCnpj = await this.eventMakerRepository.findByCnpj(input.cnpj)

    if (findCnpj) throw new Error('Usuário já existe com esse cnpj!')

    const hashPassword = await this.cryptService.encrypt(input.password)

    const createdUser = await this.eventMakerRepository.create({
      ...input,
      isVerified: false,
      password: hashPassword
    })

    const token = this.jwtService.sign(
      {
        email: createdUser.email,
        role: Role.EVENT_MAKER
      },
      {
        subject: createdUser.id
      }
    )

    const link = `${APP_URL}/verify-email?token=${token}`

    this.eventBus.publish(
      new CreatedEventMakerEvent({ email: createdUser.email, name: createdUser.name, link })
    )

    return {
      token,
      eventMaker: createdUser
    }
  }
}
