import { CreateCategoryDto } from '@common/dtos'

export class CreateCategoryCommand {
  constructor(public readonly input: CreateCategoryDto) {}
}
