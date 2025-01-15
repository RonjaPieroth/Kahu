import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Chat} from '../../models/chat';
import {Message} from '../../models/message';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnChanges{

  @Input() chat?:Chat
  @Input() owningProfile?: Shelter|PetOwner;

 messages: Message[] = [];

  constructor(private chatService: ChatService
  ) {

  }


    ngOnChanges(){
    if (this.chat){
      this.chatService.getChatMessages(this.chat).subscribe(data => this.messages = data);
    }

    }

    isOwningProfile(senderId: string): boolean{
    return senderId === this.owningProfile?.id;
    }

createMessage(){
    let message: Message;

}


}
