import { MailService } from '@common/services'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { CreatedAccountEvent } from './created-account.event'

@EventsHandler(CreatedAccountEvent)
export class CreatedAccountHandler implements IEventHandler<CreatedAccountEvent> {
  constructor(private readonly mailService: MailService) {}
  handle({ input }: CreatedAccountEvent) {
    this.mailService.sendMail({
      to: { address: input.email, name: input.name },
      subject: 'Confirmação de email',
      body: `<h2>Bem vindo ${input.name}</h2>
      <p>Bem vindo, este é o email de verificação !</p>
      <a href="${input.link}">Clique aqui para verificar email!</a>`
    })
  }
}
