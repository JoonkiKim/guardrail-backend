import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Infusion } from 'src/apis/infusions/entities/infusion.entity';
import { encryptionTransformer } from 'src/commons/transformer/encryption.transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, // OneToOne에서 ManyToOne으로 변경
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PeriodType {
  ONE_WEEK = '1주',
  ONE_MONTH = '1달',
  ONE_YEAR = '1년',
  TEN_YEARS = '10년',
}

registerEnumType(PeriodType, {
  name: 'PeriodType',
  description: 'Period type for infusion details',
});

@Entity()
@ObjectType()
export class InfusionDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ transformer: encryptionTransformer })
  @Field(() => String)
  description: string;

  @Column({
    type: 'enum',
    enum: PeriodType,
  })
  @Field(() => PeriodType)
  periodType: PeriodType;

  @ManyToOne(() => Infusion, (infusion) => infusion.infusionDetails) // ManyToOne으로 변경
  @JoinColumn()
  @Field(() => Infusion, { nullable: true })
  infusion?: Infusion; // 관계 필드 추가

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
