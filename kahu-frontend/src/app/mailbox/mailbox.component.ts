import {Component, ViewChild} from '@angular/core';
import {PetOwner} from '../models/pet-owner';
import {Shelter} from '../models/shelter';
import {ChatService} from '../services/chat.service';
import {LoginService} from '../services/login.service';
import {Chat} from '../models/chat';
import {Pet} from '../models/pet';
import {ShelterService} from '../services/shelter.service';
import {PetOwnerService} from '../services/pet-owner.service';
import {PetService} from '../services/pet.service';
import {interval, Subscription} from 'rxjs';
import {ChatComponent} from './chat/chat.component';


@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailboxComponent{
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;
  activeUser?: PetOwner | Shelter;
  chats: Chat[] = [];
  activeChat?: Chat;
  chatpartner?: Shelter | PetOwner;
  pet?: Pet;
  subscription!: Subscription;
  isLoading: boolean = true;


  constructor(
    private chatService: ChatService,
    private loginService: LoginService,
    private shelterService: ShelterService,
    private petOwnerService: PetOwnerService,
    private petService: PetService
  ) {

    this.loginService.getProfile().subscribe(data => {
      this.activeUser = data.profile;
      if (this.activeUser?.id){
      this.chatService.getChats(this.activeUser.id).subscribe(data =>
      {this.chats = data;
        if (this.chats.length > 0){
        this.activeChat = this.chats[0];
        this.setChatPartner();
        this.setPet();
        this.subscription = interval(5000).subscribe(() => this.refreshChats());
        }
        this.isLoading = false;
      })}
    });
  }

  refreshChats(): void{
    if (this.activeUser?.id){
    this.chatService.getChats(this.activeUser.id).subscribe(data => {
      if(!this.isEqual(this.chats, data)){
        this.chats = data;}})}
    }


  setChatPartner(): void{
    if (this.activeChat){
    if (this.loginService.isPetOwner(this.activeUser)){
      this.shelterService.getShelterByID(this.activeChat.userTwoId.toString()).subscribe(data => this.chatpartner = data);
    }
    else {
      this.petOwnerService.getPetOwnerByID(this.activeChat.userTwoId.toString()).subscribe(data => this.chatpartner = data);
    }}
  }

  setPet(): void{
    if (this.activeChat && this.activeChat.subject){
      this.petService.getPetByID(this.activeChat.subject.toString()).subscribe(data => this.pet = data);
    }
    else {
      this.pet = undefined;
    }
  }

  changeVisibility(){
    document.getElementById("chatOverview")!.classList.toggle("chat-details-open");
    document.getElementById("chat")!.classList.toggle("chat-overview-open");
  }

  changeActiveChat(chat: Chat): void{
    if (this.activeChat === chat){
      this.chatComponent.scrollToBottom();
    } else {this.activeChat=chat;}
    this.reloadChatTitle();
    this.changeVisibility();
  }

  reloadChatTitle(): void {
    this.setChatPartner();
    this.setPet();
  }

  isEqual(originalChats: Chat[], newChats: Chat[]): boolean{
    return JSON.stringify(originalChats) === JSON.stringify(newChats);
  }

  get chatPartnerIsShelter(): boolean{
    return !this.loginService.isPetOwner(this.chatpartner);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
