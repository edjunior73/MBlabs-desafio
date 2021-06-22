import { UpdateEventDto } from '@common/dtos'

export class UpdateEventCommand {
  constructor(public input: UpdateEventDto, public eventId: string) {}
}
