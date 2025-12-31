import { Field, ObjectType } from '@nestjs/graphql';

import { PavlovDetail } from 'src/apis/pavlovDetails/entities/pavlovDetail.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { encryptionTransformer } from 'src/commons/transformer/encryption.transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, // 추가
  JoinColumn, // 추가
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Pavlov {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // User와의 관계 추가
  @ManyToOne(() => User, (user) => user.pavlovs)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  name: string;

  @OneToMany(() => PavlovDetail, (pavlovDetail) => pavlovDetail.pavlov)
  @Field(() => [PavlovDetail])
  pavlovDetails: PavlovDetail[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
