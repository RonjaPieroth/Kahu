import {Pet} from './pet';
import {Address} from './address';

export interface Shelter {
  id?: number;
  name: string;
  pointOfContact?: string;
  address: Address;
  website?: string;
  mailAddress?: string;
  hoursOfOperation?: string;
  pets: Pet[];
}
