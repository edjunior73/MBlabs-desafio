import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CategoryRepository } from './repositories/category.repository'

@Module({
  imports: [CqrsModule],
  providers: [CategoryRepository]
})
export class CategoryModule {}
