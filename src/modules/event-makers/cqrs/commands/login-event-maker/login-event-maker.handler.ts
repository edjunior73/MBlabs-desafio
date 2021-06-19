import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { EventMakerRepository } from '@modules/event-makers/repositories'
import { CryptService } from '@common/services'
import { EventMakerLogin } from '@common/models'
import { Role } from '@common/types'
import { LoginEventMakerCommand } from './login-event-maker.command'

@CommandHandler(LoginEventMakerCommand)
export class LoginEventMakerHandler
  implements ICommandHandler<LoginEventMakerCommand, EventMakerLogin>
{
  constructor(
    private readonly eventMakerRepository: EventMakerRepository,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService
  ) {}

  async execute({ input }: LoginEventMakerCommand): Promise<EventMakerLogin> {
    const { email, password } = input

    const eventMaker = await this.eventMakerRepository.findByEmail(email)
    if (!eventMaker) throw new Error('Não existe uma conta com esse email')

    const isPasswordCorrect = await this.cryptService.compare(password, eventMaker.password)
    if (!isPasswordCorrect) throw new Error('Senha incorreta')

    const token = this.jwtService.sign(
      { email, role: Role.EVENT_MAKER },
      { subject: eventMaker.id }
    )

    return {
      token,
      eventMaker
    }
  }
}
