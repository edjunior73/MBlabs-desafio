import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { CqrsModule } from '../cqrs'
import { UserResolver } from './resolvers'

const UseGraphQLModule = NestGraphQLModule.forRoot({
  autoSchemaFile: true
})

@Module({
  imports: [CqrsModule, UseGraphQLModule],
  providers: [UserResolver],
  exports: [UseGraphQLModule]
})
export class GraphQLModule {}
