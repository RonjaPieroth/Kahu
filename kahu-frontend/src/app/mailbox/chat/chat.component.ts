import {Component, Input, OnChanges} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Chat} from '../../models/chat';
import {Message} from '../../models/message';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnChanges {

  @Input() chat?: Chat
  @Input() owningProfile?: Shelter | PetOwner;
  newMessage = new FormControl("", [Validators.required]);
  messages: Message[] = [];

  constructor(private chatService: ChatService
  ) {
  }

  ngOnChanges() {
    this.getChatMessages();
  }

  sendMessage(): void {
    let message: Message = this.createMessage();
    this.chatService.saveMessage(message).subscribe(data => {
      console.log(data);
      this.newMessage.reset();
      this.getChatMessages();
    });
  }

  getChatMessages(): void {
    if (this.chat) {
      this.chatService.getChatMessages(this.chat).subscribe(data => this.messages = data);
    }
  }

  isOwningProfile(senderId: string): boolean {
    return senderId === this.owningProfile?.id;
  }

  createMessage(): Message {
    let message: Message = {
      message: this.newMessage.value!,
      timestamp: new Date(),
      senderId: this.chat!.userOneId.toString(),
      recipientId: this.chat!.userTwoId.toString(),
      petId: this.chat!.subject
    };
    if (this.chat?.subject) {
      message.petId = this.chat.subject;
    }
    return message;
  }
}
