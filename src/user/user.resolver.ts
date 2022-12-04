import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput, GetUserById } from './dto/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createNewUser(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userId') userId: string) {
    return this.userService.findUserById(userId);
  }
}
