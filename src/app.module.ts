import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@modules/cqrs'
import { GraphQLModule } from '@modules/graphql'
import { PrismaModule } from '@modules/prisma'

import { config } from '@common/config'

@Module({
  imports: [
    CqrsModule,
    GraphQLModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] })
  ]
})
export class AppModule {}
