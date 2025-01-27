import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chat} from '../../models/chat';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {Pet} from '../../models/pet';
import {ShelterService} from '../../services/shelter.service';
import {PetOwnerService} from '../../services/pet-owner.service';
import {PetService} from '../../services/pet.service';
import {LoginService} from '../../services/login.service';
import {Message} from '../../models/message';
import {ChatService} from '../../services/chat.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrl: './chat-element.component.css'
})
export class ChatElementComponent implements OnChanges{

  @Input() chat?: Chat;
  @Input() owningProfile?: Shelter | PetOwner;
  chatpartner?: Shelter | PetOwner;
  pet?: Pet;

  constructor(
    private shelterService: ShelterService,
    private petOwnerService: PetOwnerService,
    private petService: PetService,
    private loginService: LoginService,
    private chatService: ChatService) {
  }

  ngOnChanges(): void {
    if (this.chat && this.owningProfile){
      if (this.chat.subject){
        this.petService.getPetByID(this.chat.subject.toString()).subscribe(data => this.pet = data);
      }
      if (this.loginService.isPetOwner(this.owningProfile)){
        this.shelterService.getShelterByID(this.chat.userTwoId.toString()).subscribe(data => this.chatpartner = data);
      }
      else {this.petOwnerService.getPetOwnerByID(this.chat.userTwoId.toString()).subscribe(data => this.chatpartner = data)}
    }
  }





}
