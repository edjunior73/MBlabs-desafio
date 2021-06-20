import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers, EventHandlers, QueryHandlers } from './cqrs'
import { UserRepository } from './repositories/user.repository'
import { UserResolver } from './resolvers'
import { ServicesModule, UserService } from './services'

@Module({
  imports: [ServicesModule, CqrsModule],
  providers: [
    UserRepository,
    UserService,
    UserResolver,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ],
  exports: [UserService, UserRepository]
})
export class UserModule {}
