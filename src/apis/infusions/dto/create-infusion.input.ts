import { Field, InputType } from '@nestjs/graphql';
import { InfusionCategory } from '../entities/infusion.entity';
import { InfusionDetailInput } from 'src/apis/infusionDetails/dto/infusionDetail.input';

@InputType()
export class CreateInfusionInput {
  @Field(() => String)
  title: string;

  @Field(() => InfusionCategory)
  category: InfusionCategory;

  @Field(() => String)
  description: string;

  @Field(() => [InfusionDetailInput], { nullable: true }) // 배열로 변경
  infusionDetails?: InfusionDetailInput[]; // 복수형으로 변경
}
