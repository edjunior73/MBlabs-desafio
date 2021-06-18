import { APP_URL } from '@common/constants/server'
import { EventMakerLogin } from '@common/models/event-maker-login.model'
import { CryptService } from '@common/services'
import { EventMakerRepository } from '@modules/event-makers/repositories/event-maker.repository'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { CreatedEventMakerEvent } from '../../events/created-event-maker/created-event-maker.event'
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
      password: hashPassword
    })

    const token = this.jwtService.sign({ id: createdUser.id, email: createdUser.email })

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
