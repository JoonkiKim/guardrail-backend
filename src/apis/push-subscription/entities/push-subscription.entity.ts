// src/apis/push-subscription/entities/push-subscription.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
@ObjectType() // 추가: GraphQL ObjectType 데코레이터
export class PushSubscription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String) // 추가
  id: string;

  @ManyToOne(() => User, (user) => user.pushSubscriptions, {
    onDelete: 'CASCADE',
  })
  @Field(() => User) // 추가
  user: User;

  @Column()
  @Field(() => String) // 추가
  endpoint: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true }) // 추가
  expirationTime: string | null;

  @Column({ type: 'json' })
  @Field(() => String) // JSON은 String으로 처리하거나 별도 InputType 생성
  keys: {
    p256dh: string;
    auth: string;
  };

  @CreateDateColumn()
  @Field(() => Date) // 추가
  createdAt: Date;
}
