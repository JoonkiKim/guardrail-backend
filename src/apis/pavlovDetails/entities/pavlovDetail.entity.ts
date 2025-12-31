import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Pavlov } from 'src/apis/pavlovs/entities/pavlov.entity';
import { encryptionTransformer } from 'src/commons/transformer/encryption.transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PavlovDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  description: string;

  @ManyToOne(() => Pavlov, (pavlov) => pavlov.pavlovDetails) // ManyToOne으로 변경
  @JoinColumn()
  @Field(() => Pavlov)
  pavlov: Pavlov; // 관계 필드 추가

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
