import { Field, InputType } from '@nestjs/graphql';

import { PavlovDetailInput } from 'src/apis/pavlovDetails/dto/pavlovDetail.input';

@InputType()
export class CreatePavlovInput {
  @Field(() => String)
  name: string;

  @Field(() => [PavlovDetailInput]) // 배열로 변경
  pavlovDetails: PavlovDetailInput[]; // 복수형으로 변경
}
