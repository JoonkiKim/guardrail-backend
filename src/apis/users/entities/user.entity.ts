import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Guardrail } from 'src/apis/guardrails/entities/guardrail.entity';
import { Infusion } from 'src/apis/infusions/entities/infusion.entity';
import { Pavlov } from 'src/apis/pavlovs/entities/pavlov.entity';
import { Todo } from 'src/apis/todos/entities/todo.entity';

import { PushSubscription } from 'src/apis/push-subscription/entities/push-subscription.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany, // OneToOne에서 OneToMany로 변경
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column({ nullable: true }) // ✅ nullable 추가
  @Field(() => Date, { nullable: true }) // ✅ nullable 추가
  birthDate?: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  marketingAgreed: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  termsAgreed: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  privacyAgreed: boolean;

  // OneToOne에서 OneToMany로 변경
  @OneToMany(() => Guardrail, (guardrail) => guardrail.user)
  @Field(() => [Guardrail], { nullable: true })
  guardrails?: Guardrail[];

  @OneToMany(() => Todo, (todo) => todo.user)
  @Field(() => [Todo], { nullable: true })
  todos?: Todo[];

  @OneToMany(() => Infusion, (infusion) => infusion.user)
  @Field(() => [Infusion], { nullable: true })
  infusions?: Infusion[];

  @OneToMany(() => Pavlov, (pavlov) => pavlov.user)
  @Field(() => [Pavlov], { nullable: true })
  pavlovs?: Pavlov[];

  @OneToMany(
    () => PushSubscription,
    (pushSubscription) => pushSubscription.user,
  )
  @Field(() => [PushSubscription], { nullable: true })
  pushSubscriptions?: PushSubscription[];

  @Column({ type: 'int', nullable: true, default: 9 }) // default: 9 추가
  @Field(() => Int, { nullable: true })
  reminderHour?: number;

  @Column({ default: false })
  @Field(() => Boolean)
  pushNotificationEnabled: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
