import { CreateInfusionInput } from '../dto/create-infusion.input';
import { UpdateInfusionInput } from '../dto/update-infusion.input';

export interface IInfusionsServiceCreate {
  createInfusionInput: CreateInfusionInput;
}

export interface IInfusionsServiceFindOne {
  infusionId: string;
}

export interface IInfusionsServiceUpdate {
  infusionId: string;
  updateInfusionInput: UpdateInfusionInput;
}
export interface IInfusionsServiceDelete {
  infusionId: string;
}
