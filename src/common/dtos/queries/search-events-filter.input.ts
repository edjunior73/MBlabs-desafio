import { InputType, Field, Float } from '@nestjs/graphql'
import { FieldId } from '@common/decorators'

@InputType()
export class SearchEventsFilter {
  @Field(() => Float, { nullable: true })
  minPrice?: number

  @Field(() => Float, { nullable: true })
  maxPrice?: number

  @FieldId({ nullable: true })
  categoryId?: string

  @Field({ nullable: true })
  name?: string
}
