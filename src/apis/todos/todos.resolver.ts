import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';

import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todos.input';
import { UpdateTodoInput } from './dto/update-todos.input';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';

@Resolver()
export class TodosResolver {
  constructor(
    private readonly todosService: TodosService, //
  ) {}

  @Query(() => [Todo])
  fetchTodos(@CurrentUser() user: IAuthUser): Promise<Todo[]> {
    return this.todosService.findAll({ userId: user.id });
  }

  @Query(() => Todo)
  fetchTodo(
    @Args('todoId') todoId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<Todo> {
    return this.todosService.findOne({ userId: user.id, todoId });
  }

  @Query(() => [Todo])
  fetchTodosByMonth(
    @Args('year') year: number,
    @Args('month') month: number,
    @CurrentUser() user: IAuthUser,
  ): Promise<Todo[]> {
    return this.todosService.findByMonth({ userId: user.id, year, month });
  }

  @Mutation(() => [Todo]) // Todo[]로 변경
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Todo[]> {
    // 반환 타입도 Todo[]로 변경
    return this.todosService.create({ userId: user.id, createTodoInput });
  }

  @Mutation(() => Todo)
  updateTodo(
    // 수정API에서는 수정할 상품의 ID와 수정할 내용을 알려줘야된다
    // 이때 수정'할'내용은 하나의 '객체'에 담아서 전달한다 -> CreateProductInput dto에 PartialType을 달아서 상속한 다음에 UpdateProductInput dto를 만들어준다
    @Args('todoId') todoId: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Todo> {
    return this.todosService.update({
      userId: user.id,
      todoId,
      updateTodoInput,
    });
  }

  @Mutation(() => Boolean)
  deleteTodo(
    @Args('todoId') todoId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<boolean> {
    return this.todosService.delete({ userId: user.id, todoId });
  }
}
