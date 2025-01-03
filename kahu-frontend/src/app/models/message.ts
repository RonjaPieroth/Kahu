import {PetOwner} from './pet-owner';
import {Shelter} from './shelter';
import {Pet} from './pet';

export interface Message {
  id?: number;
  message: string;
  timestamp: Date;
  sender: Shelter | PetOwner;
  recipient: Shelter | PetOwner;
  pet?: Pet;
}
