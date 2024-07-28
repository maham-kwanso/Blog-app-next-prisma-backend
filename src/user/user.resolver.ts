// import { Context, Query, Resolver } from '@nestjs/graphql';
// import { User } from './entities/user.entity';
// import { UserService } from './user.service';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from './jwt/jwt-auth.guard';
// import { UserProfilePayload } from './dto/user-profile-payload';
// // import { UserContext } from 'src/utils/user.context';

// @Resolver(() => User)
// export class UserResolver {
//   constructor(private readonly userService: UserService) {}

//   @Query(() => UserProfilePayload)
//   @UseGuards(JwtAuthGuard)
//   async userProfile(
//     @Context() context: any,
//     // @UserContext() user: any,
//   ): Promise<UserProfilePayload> {
//     // console.log('user : ', user);
//     return {
//       user: await this.userService.profile(context.req.user.id),
//       message: 'successfully displayed user profile',
//       status: 200,
//     };
//   }
// }
