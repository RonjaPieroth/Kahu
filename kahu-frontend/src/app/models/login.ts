import {PetOwner} from './pet-owner';
import {Shelter} from './shelter';

export interface Login {
  id?: number;
  mail: string;
  password: string;
  profile?: PetOwner;
}
