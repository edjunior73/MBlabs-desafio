import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { isEmail } from 'class-validator'
import { SignUpUserDto, UpdateUserDto, LoginDto } from '@common/dtos'
import { User, UserEvent, UserLogin } from '@common/models'
import { Roles, AuthUser } from '@common/decorators'
import { AuthGuard } from '@common/guards'
import { Role, JUser } from '@common/types'
import { UserService } from '@modules/users/services'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true, name: 'userByEmail' })
  getUserByEmail(@Args('email') email: string) {
    if (!isEmail(email)) {
      throw new Error('Precisa ser inserido um email válido')
    }
    return this.userService.getUserByEmail(email)
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  me(@AuthUser() user: JUser) {
    return this.userService.getUserByEmail(user.email)
  }

  @Mutation(() => UserLogin)
  signUpUser(@Args('userInput') input: SignUpUserDto) {
    return this.userService.signUpUser(input)
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  deleteUser(@AuthUser() user: JUser) {
    return this.userService.deleteUser(user.id)
  }

  @Mutation(() => UserLogin)
  loginUser(@Args('userInput') input: LoginDto) {
    return this.userService.loginUser(input)
  }

  @Mutation(() => UserEvent)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  buyTicket(@Args('ticketId') ticketId: string, @AuthUser() user: JUser) {
    return this.userService.buyTicket(ticketId, user.id)
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  updateUser(@Args('userInput') input: UpdateUserDto, @AuthUser() user: JUser) {
    return this.userService.updateUser(input, user.id)
  }
}
