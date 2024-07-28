import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignedInUser {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;
}
