import {Pet} from './pet';
import {Login} from './login';
import {PetOwnershipType} from './pet-ownership-type';
import {TypeOfHome} from './type-of-home';
import {ResidentialArea} from './residential-area';

export interface User {

  id?: string;
  login: Login;
  name: string;
  age: number;
  postalCode: string;
  hasExperience: boolean;
  profilePicture: string;
  profileText: string;
  hasChildren: boolean;
  hasPets: boolean;
  typeOfHome: TypeOfHome
  residentialArea: ResidentialArea
  homeSize: number;
  hasGarden: boolean;
  /*livingSituationPicture: string[];*/
  lookingFor: PetOwnershipType[];
  likedPets: Pet[];
  matches: Pet[];
}
