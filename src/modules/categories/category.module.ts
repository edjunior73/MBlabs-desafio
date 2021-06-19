import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers, QueryHandlers } from './cqrs'
import { CategoryRepository } from './repositories'
import { CategoryResolver } from './resolver'
import { CategoryService } from './services'

@Module({
  imports: [CqrsModule],
  providers: [
    CategoryRepository,
    CategoryService,
    CategoryResolver,
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [CategoryRepository, CategoryService]
})
export class CategoryModule {}
