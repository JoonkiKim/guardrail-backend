import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePavlovInput } from './create-pavlov.input';

@InputType()
export class UpdatePavlovInput extends PartialType(CreatePavlovInput) {}
