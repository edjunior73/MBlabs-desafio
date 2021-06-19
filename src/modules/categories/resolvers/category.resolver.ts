import { CreateCategoryDto } from '@common/dtos'
import { Category } from '@common/models'
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'
import { CategoryService } from '../services'

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  getCategories() {
    return this.categoryService.getCategories()
  }

  @Mutation(() => Category)
  createCategory(@Args('categoryInput') input: CreateCategoryDto) {
    return this.categoryService.createCategory(input)
  }
}
