import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { SignedInUser } from './signed-in-user.dto';

@ObjectType()
export class SignInPayload {
  @Field(() => User)
  user: SignedInUser;

  @Field()
  jwt: string;

  @Field(() => Int)
  status: number;
}
