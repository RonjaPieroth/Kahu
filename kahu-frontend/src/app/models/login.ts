import {User} from './user';

export interface Login {
  id?: number;
  mail: string;
  password: string;
  profile?: User;
}
