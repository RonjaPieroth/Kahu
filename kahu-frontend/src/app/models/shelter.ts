import {Pet} from './pet';
import {Address} from './address';
import {Login} from './login';

export interface Shelter {
  id?: string;
  name: string;
  profileText?: string
  login: Login;
  pointOfContact?: string;
  address: Address;
  website?: string;
  mailAddress?: string;
  hoursOfOperation?: string;
  pets: Pet[];
}
