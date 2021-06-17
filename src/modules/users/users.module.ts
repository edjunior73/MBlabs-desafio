import { Module } from '@nestjs/common'
import { GraphQLModule } from './graphql'
import { UserRepository } from './repositories/user.repository'

@Module({
  imports: [GraphQLModule],
  providers: [UserRepository]
})
export class UserModule {}
