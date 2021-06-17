import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { CqrsModule } from '../cqrs'

@Module({
  imports: [
    CqrsModule,
    NestGraphQLModule.forRoot({
      autoSchemaFile: true
    })
  ]
})
export class GraphQLModule {}
