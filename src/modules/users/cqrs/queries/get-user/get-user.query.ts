import { GetUserDto } from '@common/dtos'

export class GetUserQuery {
  constructor(public readonly input: GetUserDto) {}
}
