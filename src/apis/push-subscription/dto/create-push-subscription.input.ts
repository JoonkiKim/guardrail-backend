import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PushSubscriptionKeysInput {
  @Field()
  p256dh: string;

  @Field()
  auth: string;
}

@InputType()
export class CreatePushSubscriptionInput {
  @Field()
  endpoint: string;

  @Field({ nullable: true })
  expirationTime?: string;

  @Field(() => PushSubscriptionKeysInput)
  keys: PushSubscriptionKeysInput;
}
