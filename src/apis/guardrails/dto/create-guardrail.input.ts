import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuardrailInput {
  @Field(() => String)
  feeling: string;

  @Field(() => String)
  mostImpt: string;

  @Field(() => String)
  diary: string;

  @Field(() => String)
  thanks: string;

  @Field(() => String)
  regret: string;

  @Field(() => String)
  direction: string;

  @Field(() => String)
  oneStep: string;

  @Field(() => String)
  ignorance: string;
}
