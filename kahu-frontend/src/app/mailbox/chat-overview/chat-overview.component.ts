import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Chat} from '../../models/chat';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrl: './chat-overview.component.css'
})
export class ChatOverviewComponent {

  @Input() chats?: Chat[];
  @Input() owningProfile?: Shelter | PetOwner;
  @Output() changeChatEvent = new EventEmitter<Chat>();

  changeChat(chat: Chat): void{
    this.changeChatEvent.emit(chat);
  }
}
