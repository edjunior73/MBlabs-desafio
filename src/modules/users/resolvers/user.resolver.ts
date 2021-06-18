import { GetUserDto, SignUpUserDto } from '@common/dtos'
import { UserLogin } from '@common/models/user-login.model'
import { UserService } from '@modules/users/services'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => String)
  getUser(@Args('userInput') input: GetUserDto) {
    return this.userService.getUser(input)
  }
  @Mutation(() => UserLogin)
  signUpUser(@Args('userInput') input: SignUpUserDto) {
    return this.userService.signUpUser(input)
  }
}
