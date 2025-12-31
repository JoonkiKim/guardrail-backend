import { CreatePavlovInput } from '../dto/create-pavlov.input';
import { UpdatePavlovInput } from '../dto/update-pavlov.input';

export interface IPavlovsServiceCreate {
  createPavlovInput: CreatePavlovInput;
}

export interface IPavlovsServiceFindOne {
  pavlovId: string;
}

export interface IPavlovsServiceUpdate {
  pavlovId: string;
  updatePavlovInput: UpdatePavlovInput;
}
export interface IPavlovsServiceDelete {
  pavlovId: string;
}
