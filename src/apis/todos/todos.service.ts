import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todos.input';
import { UpdateTodoInput } from './dto/update-todos.input';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}
  // 여러개 조회 -> fetchProducts에 연결
  findAll({ userId }: { userId: string }): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { user: { id: userId } },
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }

  async findOne({
    userId,
    todoId,
  }: {
    userId: string;
    todoId: string;
  }): Promise<Todo> {
    const todo = await this.todosRepository.findOne({
      where: {
        id: todoId,
        user: { id: userId },
      },
    });

    if (!todo) {
      throw new NotFoundException(
        '데이터를 찾을 수 없거나 접근 권한이 없습니다.',
      );
    }

    return todo;
  }

  async create({
    userId,
    createTodoInput,
  }: {
    userId: string;
    createTodoInput: CreateTodoInput;
  }): Promise<Todo[]> {
    const { repeatType, repeatUntil, ...todoData } = createTodoInput;

    if (repeatType && repeatUntil) {
      return this.createRepeatingTodos(
        userId,
        todoData,
        repeatType,
        repeatUntil,
      );
    } else {
      const result = await this.todosRepository.save({
        ...createTodoInput,
        user: { id: userId },
        isRepeating: false,
      });
      return [result];
    }
  }

  private async createRepeatingTodos(
    userId: string,
    todoData: any,
    repeatType: string,
    repeatUntil: Date,
  ): Promise<Todo[]> {
    const todos: Todo[] = [];
    const startDate = new Date(todoData.date);

    // 원본 Todo 생성
    const parentTodo = await this.todosRepository.save({
      ...todoData,
      user: { id: userId },
      isRepeating: true,
      repeatType,
      repeatUntil,
    });

    todos.push(parentTodo);

    // 반복 Todo들 생성
    let currentDate = new Date(startDate);

    while (currentDate <= repeatUntil) {
      switch (repeatType) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
      }

      if (currentDate <= repeatUntil) {
        const repeatingTodo = await this.todosRepository.save({
          ...todoData,
          user: { id: userId },
          date: new Date(currentDate),
          isRepeating: true,
          parentTodoId: parentTodo.id,
        });
        todos.push(repeatingTodo);
      }
    }

    return todos;
  }

  async update({
    userId,
    todoId,
    updateTodoInput,
  }: {
    userId: string;
    todoId: string;
    updateTodoInput: UpdateTodoInput;
  }): Promise<Todo> {
    const todo = await this.findOne({ userId, todoId });

    return this.todosRepository.save({
      ...todo,
      ...updateTodoInput,
    });
  }

  async delete({
    userId,
    todoId,
  }: {
    userId: string;
    todoId: string;
  }): Promise<boolean> {
    await this.findOne({ userId, todoId });

    const result = await this.todosRepository.softDelete({
      id: todoId,
    });

    return result.affected ? true : false;
  }

  async findByMonth({
    userId,
    year,
    month,
  }: {
    userId: string;
    year: number;
    month: number;
  }): Promise<Todo[]> {
    // 월의 시작일과 종료일 계산
    const startDate = new Date(year, month - 1, 1); // month는 0부터 시작하므로 -1
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // 다음 달 0일 = 이번 달 마지막 날

    return this.todosRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('todo.date >= :startDate', { startDate })
      .andWhere('todo.date <= :endDate', { endDate })
      .orderBy('todo.date', 'ASC')
      .addOrderBy('todo.startTime', 'ASC')
      .getMany();
  }
}
