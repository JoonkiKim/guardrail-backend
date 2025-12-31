import { InputType, OmitType } from '@nestjs/graphql';
import { InfusionDetail } from '../entities/infusionDetail.entity';

@InputType()
export class InfusionDetailInput extends OmitType(
  InfusionDetail,
  ['id', 'createdAt', 'updatedAt', 'deletedAt', 'infusion'], // 'infusion' 필드도 제외
  InputType,
) {}
