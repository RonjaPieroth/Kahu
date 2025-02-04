import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Chat} from '../../models/chat';
import {Message} from '../../models/message';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {FormControl, Validators} from '@angular/forms';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnChanges {

  @Input() chat?: Chat
  @Input() owningProfile?: Shelter | PetOwner;
  @ViewChild('chatBox') chatBox!: ElementRef;
  newMessage = new FormControl("", [Validators.required]);
  messages: Message[] = [];
  subscription!: Subscription;
  isStarting: boolean = true;

  constructor(private chatService: ChatService
  ) {
    this.subscription = interval(10000).subscribe(() => {
      this.getChatMessages();
    });
  }

  ngOnChanges() {
    this.getChatMessages();
    this.scrollToBottom();
  }

  sendMessage(): void {
    let message: Message = this.createMessage();
    this.chatService.saveMessage(message).subscribe(data => {
      console.log(data);
      this.newMessage.reset();
      this.getChatMessages();
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked(): void {
    if (this.isStarting && this.chatBox) {
      this.scrollToBottom();
      this.isStarting = false;
    }
  }

  isEqual(originalMessages: Message[], newMessages: Message[]) {
    return JSON.stringify(originalMessages) === JSON.stringify(newMessages);
  }

  getChatMessages(): void {
    if (this.chat) {
      this.chatService.getChatMessages(this.chat).subscribe(data => {
        if (!this.isEqual(this.messages, data)) {
          this.messages = data;
        }
      });
    }
  }

  isOwningProfile(senderId: string): boolean {
    return senderId === this.owningProfile?.id;
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }, 100);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
