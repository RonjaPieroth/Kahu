import {Component, OnInit} from '@angular/core';
import {PetOwner} from '../models/pet-owner';
import {Shelter} from '../models/shelter';
import {ChatService} from '../services/chat.service';
import {LoginService} from '../services/login.service';
import {Chat} from '../models/chat';


@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailboxComponent implements OnInit{
  activeUser?: PetOwner | Shelter;
  chats: Chat[] = [];
  activeChat?: Chat;


  constructor(
    private chatService: ChatService,
    private loginService: LoginService
  ) {

    this.loginService.getProfile().subscribe(data => {
      this.activeUser = data.profile;
      if (this.activeUser?.id){
      this.chatService.getChats(this.activeUser.id).subscribe(data =>
      {this.chats = data;
        if (this.chats.length > 0){
        this.activeChat = this.chats[0];}
      })}
    });

  }

  ngOnInit(){

  }


}
