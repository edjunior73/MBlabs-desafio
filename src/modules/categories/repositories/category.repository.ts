import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma'
import { CreateCategoryDto } from '@common/dtos'
import { Category } from '@common/models'

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(input: CreateCategoryDto): Promise<Category> {
    const category = await this.prismaService.category.create({ data: input })
    return category as Category
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany()
    return categories
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prismaService.category.count({
      where: {
        id
      }
    })
    return count > 0
  }
}
