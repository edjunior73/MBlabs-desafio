import { Field, FieldOptions, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

export function FieldId(options?: FieldOptions) {
  return (target: any, key: string) => {
    Field(() => ID, options)(target, key)
    IsUUID()(target, key)
  }
}
