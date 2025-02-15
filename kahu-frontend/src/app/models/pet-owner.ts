import {Pet} from './pet';
import {Login} from './login';
import {PetOwnershipType} from './enums/pet-ownership-type';
import {TypeOfHome} from './enums/type-of-home';
import {ResidentialArea} from './enums/residential-area';
import {Address} from './address';

export interface PetOwner {

  id?: string;
  login: Login;
  name: string;
  age: number;
  address: Address;
  hasExperience: boolean;
  profilePicture: string;
  profileText: string;
  hasChildren: boolean;
  hasPets: boolean;
  typeOfHome: TypeOfHome
  residentialArea: ResidentialArea
  homeSize: number;
  pictures: string[];
  hasGarden: boolean;
  lookingFor: PetOwnershipType[];
  matches: Pet[];
  noMatchIds: number[];
}
