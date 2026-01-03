import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { encryptionTransformer } from 'src/commons/transformer/encryption.transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, // 추가
  JoinColumn, // 추가
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoPriority {
  LOW = '낮음',
  MEDIUM = '보통',
  HIGH = '높음',
}

registerEnumType(TodoPriority, {
  name: 'TodoPriority',
  description: 'Todo priority levels',
});

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // User와의 관계 추가
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  title: string;

  @Column({ nullable: true, transformer: encryptionTransformer })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  date: Date;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  startTime: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  endTime: string;

  @Column({
    type: 'enum',
    enum: TodoPriority,
  })
  @Field(() => TodoPriority)
  priority: TodoPriority;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  repeatType?: string; // 'daily', 'weekly', 'monthly', 'yearly'

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  repeatUntil?: Date; // 반복 종료일

  @Column({ default: false })
  @Field(() => Boolean)
  isRepeating: boolean; // 반복 여부

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  parentTodoId?: string; // 원본 Todo ID (반복 생성된 Todo들이 참조)

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
