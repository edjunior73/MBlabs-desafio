import { FieldId } from '@common/decorators'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserEvent {
  @FieldId()
  userId: string

  @FieldId()
  ticketId: string
}
