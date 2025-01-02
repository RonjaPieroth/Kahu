import {Shelter} from './shelter';
import {PetOwnershipType} from './enums/pet-ownership-type';
import {PetOwner} from './pet-owner';
import {AnimalType} from './enums/animal-type';

export interface Pet {
  id?: number;
  name: string;
  animalType: AnimalType;
  age: number; //in months
  gender: 'Male' | 'Female';
  isNeutered: boolean;
  healthStatus: string;
  profileText: string;
  requirements: string;
  adoptionFee: number;
  lookingFor: PetOwnershipType[];
  pictures: string[];
  shelter: Shelter;
  matches: PetOwner[];
}
