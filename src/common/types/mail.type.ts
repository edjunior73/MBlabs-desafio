export interface IAddress {
  address: string
  name: string
}

export type IMessage = {
  from?: string | IAddress
  to: string | IAddress
  subject: string
  body: string
}

export interface IMailService {
  sendMail(message: IMessage): Promise<void>
}
