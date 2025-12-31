import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todos.input';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {}
