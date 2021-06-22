import { Field, ArgsType, Int } from '@nestjs/graphql'
import { IsOptional, Max, Min } from 'class-validator'
import { SearchEventsFilter } from './search-events-filter.input'

@ArgsType()
export class SearchEventsArgs {
  @Field(() => SearchEventsFilter, { nullable: true })
  filter?: SearchEventsFilter

  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsOptional()
  page?: number

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(30)
  @IsOptional()
  pageSize?: number
}
