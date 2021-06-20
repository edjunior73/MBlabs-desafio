import { CreateEventDto } from '@common/dtos'

export class CreateEventCommand {
  constructor(public readonly input: CreateEventDto) {}
}
