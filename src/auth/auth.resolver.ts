import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Auth } from './entities/auth.entity';
// import { CreateAuthInput } from './dto/auth.dto';
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => Auth)
  // login(@Args('loginInput') loginInput: LoginDto) {
  //   return this.authService.login(loginInput);
  // }
}
