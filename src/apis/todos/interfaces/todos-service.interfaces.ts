import { CreateTodoInput } from '../dto/create-todos.input';
import { UpdateTodoInput } from '../dto/update-todos.input';

export interface ITodosServiceCreate {
  createTodoInput: CreateTodoInput;
}

export interface ITodosServiceFindOne {
  todoId: string;
}

export interface ITodosServiceUpdate {
  todoId: string;
  updateTodoInput: UpdateTodoInput;
}
export interface ITodosServiceDelete {
  todoId: string;
}
