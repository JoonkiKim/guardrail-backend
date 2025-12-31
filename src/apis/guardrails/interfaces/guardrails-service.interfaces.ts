import { CreateGuardrailInput } from '../dto/create-guardrail.input';
import { UpdateGuardrailInput } from '../dto/update-guardrail.input';

export interface IGuardrailsServiceCreate {
  createGuardrailInput: CreateGuardrailInput;
}

export interface IGuardrailsServiceFindOne {
  guardrailId: string;
}

export interface IGuardrailsServiceUpdate {
  guardrailId: string;
  updateGuardrailInput: UpdateGuardrailInput;
}
export interface IGuardrailsServiceDelete {
  guardrailId: string;
}
