import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpPayload } from './dto/sign-up-payload';
import { SignUpInput } from './dto/sign-up.dto';
import { SignInPayload } from './dto/sign-in-payload';
import { Get, Param, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { SignInInput } from './dto/sign-in.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  //creating login password for the user
  @Mutation(() => SignUpPayload)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignUpPayload> {
    const user = await this.authService.registerUser(signUpInput);
    return {
      user,
      jwt: await this.authService.signInUser(user),
      message: 'User Created',
      status: 201,
    };
  }

  //authenticating user and generating a jwt for user
  @Mutation(() => SignInPayload)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: any,
  ): Promise<SignInPayload> {
    return {
      user: context.user,
      jwt: await this.authService.signInUser(context.user), //TODO
      status: 200,
    };
  }

  @Get(':email')
  emailVerificationLink(@Param('email') email: string) {
    return 'hello ' + email;
  }
}
