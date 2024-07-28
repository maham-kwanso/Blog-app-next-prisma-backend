import { Field, InputType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

@InputType()
export class SignUpInput {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true, defaultValue: uuidv4() })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
