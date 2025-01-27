import {Pet} from './pet';
import {Message} from './message';

export interface Chat {
  userOneId: number;
  userTwoId: number;
  subject?: number;
  lastMessage: Message;
}
