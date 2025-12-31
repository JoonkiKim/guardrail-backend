import { Field, InputType } from '@nestjs/graphql';
import { TodoPriority } from '../entities/todo.entity';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => TodoPriority)
  priority: TodoPriority;

  @Field(() => String, { nullable: true })
  repeatType?: string; // 'daily', 'weekly', 'monthly', 'yearly'

  @Field(() => Date, { nullable: true })
  repeatUntil?: Date; // 반복 종료일
}
