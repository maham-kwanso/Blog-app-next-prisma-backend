import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SignedInUser } from '../auth/dto/signed-in-user.dto';

@ObjectType()
export class UserProfilePayload {
  @Field(() => SignedInUser)
  user: SignedInUser;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}
