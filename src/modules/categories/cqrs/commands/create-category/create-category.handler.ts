import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Category } from '@common/models'
import { CategoryRepository } from '@modules/categories/repositories'
import { CreateCategoryCommand } from './create-category.command'

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async execute({ input }: CreateCategoryCommand): Promise<Category> {
    const category = await this.categoryRepository.createCategory(input)
    return category
  }
}
