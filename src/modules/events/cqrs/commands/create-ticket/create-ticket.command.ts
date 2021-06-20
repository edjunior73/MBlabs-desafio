import { CreateTicketDto } from '@common/dtos'

export class CreateTicketCommand {
  constructor(
    public readonly input: CreateTicketDto,
    public readonly eventMakerId: string
  ) {}
}
