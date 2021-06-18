import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '@modules/prisma'
import { GraphQLModule } from '@nestjs/graphql'
import { config } from '@common/config'
import { UserModule } from '@modules/users'
import { EventModule } from '@modules/events'
import { EventMakerModule } from '@modules/event-makers'
import { CategoryModule } from '@modules/categories'

@Module({
  imports: [
    UserModule,
    EventModule,
    EventMakerModule,
    CategoryModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
