import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';

@ObjectType()
export class SignUpPayload {
  @Field(() => User)
  user: User;

  @Field()
  jwt: string;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}
