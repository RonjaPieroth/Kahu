import {Pet} from './pet';

export interface User {

  id?: string;
  name: string;
  location: string; // linked to a location?
  lookingFor: string; //enum
  hasChildren: boolean;
  hasGarden: boolean;
  hasPets: boolean;
  hasExperience: boolean;
  profilePicture: string;
  profileText: string;
  typeOfHome: string; // enum
  homeSize: number;
  residentialArea: string; // enum
  livingSituationPicture: string[];
  age: number;
  likedPets: Pet[];
  matches: Pet[];
}
