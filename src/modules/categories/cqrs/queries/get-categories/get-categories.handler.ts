import { CategoryRepository } from '@modules/categories/repositories'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetCategoriesQuery } from './get-categories.query'

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async execute() {
    const getUser = this.categoryRepository.getCategories()

    return getUser
  }
}
