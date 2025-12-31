import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePushNotificationInput {
  @Field(() => Boolean)
  enabled: boolean;
}
