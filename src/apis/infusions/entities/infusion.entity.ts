import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InfusionDetail } from 'src/apis/infusionDetails/entities/infusionDetail.entity';
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

export enum InfusionCategory {
  DECISION = '의사결정',
  STRESS = '스트레스',
  CONSUMPTION = '소비',
}

registerEnumType(InfusionCategory, {
  name: 'InfusionCategory',
  description: 'Infusion category types',
});

@Entity()
@ObjectType()
export class Infusion {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // User와의 관계 추가
  @ManyToOne(() => User, (user) => user.infusions)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  title: string;

  @Column({
    type: 'enum',
    enum: InfusionCategory,
  })
  @Field(() => InfusionCategory)
  category: InfusionCategory;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  description: string;

  @OneToMany(() => InfusionDetail, (infusionDetail) => infusionDetail.infusion)
  @Field(() => [InfusionDetail], { nullable: true })
  infusionDetails?: InfusionDetail[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
