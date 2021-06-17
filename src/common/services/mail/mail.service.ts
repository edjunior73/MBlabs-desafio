import { IMessage } from '@common/types/mail.type'
import { Injectable } from '@nestjs/common'
import nodemailer, { Transporter } from 'nodemailer'

@Injectable()
export class MailService {
  private readonly transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      from: message.from || {
        name: '',
        address: process.env.EMAIL_FROM as string
      },
      subject: message.subject,
      html: message.body,
      to: message.to
    })
  }
}
