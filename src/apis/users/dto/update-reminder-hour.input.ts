import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateReminderHourInput {
  @Field(() => Int)
  reminderHour: number;
}
