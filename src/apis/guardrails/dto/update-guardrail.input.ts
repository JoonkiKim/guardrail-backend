import { InputType, PartialType } from '@nestjs/graphql';
import { CreateGuardrailInput } from './create-guardrail.input';

@InputType()
export class UpdateGuardrailInput extends PartialType(CreateGuardrailInput) {}
