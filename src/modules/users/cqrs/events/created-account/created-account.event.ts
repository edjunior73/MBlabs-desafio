import { CreatedAccountDto } from '@common/dtos/events'

export class CreatedAccountEvent {
  constructor(public input: CreatedAccountDto) {}
}
