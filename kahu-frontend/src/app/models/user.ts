import {Pet} from './pet';
import {Login} from './login';
import {PetOwnershipType} from './pet-ownership-type';
import {TypeOfHome} from './type-of-home';
import {ResidentialArea} from './residential-area';

export interface User {

  id?: string;
  login: Login;
  name: string;
  postalCode: string;
  lookingFor: PetOwnershipType[];
  hasChildren: boolean;
  hasGarden: boolean;
  hasPets: boolean;
  hasExperience: boolean;
  profilePicture: string;
  profileText: string;
  typeOfHome: TypeOfHome
  homeSize: number;
  residentialArea: ResidentialArea
  livingSituationPicture: string[];
  age: number;
  likedPets: Pet[];
  matches: Pet[];
}
