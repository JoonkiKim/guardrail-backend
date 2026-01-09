import { Field, Int, ObjectType } from '@nestjs/graphql';
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

@Entity()
@ObjectType()
export class Guardrail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // User와의 관계 추가
  @ManyToOne(() => User, (user) => user.guardrails)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  feeling: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  mostImpt: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  diary: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  thanks: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  regret: string;
  // @Column({ transformer: encryptionTransformer, nullable: true })
  // @Field(() => String, { nullable: true })
  // regret?: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  direction: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  oneStep: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  ignorance: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
