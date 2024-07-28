import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { Post } from '../../post/entities/post.entity';
// import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  username: string;

  @Field()
  email: string;

  @Field()
  emailVerified: boolean;

  @Field()
  verificationToken: string;

  // @Field(() => [Post], { nullable: true })
  // posts?: Post[];

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];
}
