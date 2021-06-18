import { CreatedEventMakerDto } from '@common/dtos/events'

export class CreatedEventMakerEvent {
  constructor(public input: CreatedEventMakerDto) {}
}
