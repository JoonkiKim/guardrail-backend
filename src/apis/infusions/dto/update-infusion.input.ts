import { InputType, PartialType } from '@nestjs/graphql';
import { CreateInfusionInput } from './create-infusion.input';

@InputType()
export class UpdateInfusionInput extends PartialType(CreateInfusionInput) {}
