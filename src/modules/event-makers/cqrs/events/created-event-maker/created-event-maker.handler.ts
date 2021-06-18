import { MailService } from '@common/services'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { CreatedEventMakerEvent } from './created-event-maker.event'

@EventsHandler(CreatedEventMakerEvent)
export class CreatedEventMakerHandler implements IEventHandler<CreatedEventMakerEvent> {
  constructor(private readonly mailService: MailService) {}
  handle({ input }: CreatedEventMakerEvent) {
    this.mailService.sendMail({
      to: { address: input.email, name: input.name },
      subject: 'Confirmação de email',
      body: `<h2>Bem vindo ${input.name}</h2>
      <p>Bem vindo, este é o email de verificação !</p>
      <a href="${input.link}">Clique aqui para verificar email!</a>`
    })
  }
}
