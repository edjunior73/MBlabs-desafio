import { Module } from '@nestjs/common'
import { GraphQLModule } from './graphql'
import { CategoryRepository } from './repositories/category.repository'

@Module({
  imports: [GraphQLModule],
  providers: [CategoryRepository]
})
export class CategoryModule {}
