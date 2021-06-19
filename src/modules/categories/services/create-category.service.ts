import { CreateCategoryDto } from '@common/dtos'
import { Category } from '@common/models'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { CreateCategoryCommand } from '../cqrs/commands'
import { GetCategoriesQuery } from '../cqrs/queries'

@Injectable()
export class CategoryService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  getCategories(): Promise<Category[]> {
    return this.queryBus.execute(new GetCategoriesQuery())
  }
  createCategory(input: CreateCategoryDto): Promise<Category> {
    return this.commandBus.execute(new CreateCategoryCommand(input))
  }
}
