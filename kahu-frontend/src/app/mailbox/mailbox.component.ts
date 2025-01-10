import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../services/chat-service.service';
import {PetOwner} from '../models/pet-owner';
import {Shelter} from '../models/shelter';
import {ShelterService} from '../services/shelter.service';
import {PetOwnerService} from '../services/pet-owner.service';


@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailboxComponent implements OnInit{
  channelId: string | null = null;
  activeUser?: PetOwner;
  otherUser?: Shelter;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private shelterService: ShelterService,
    private petOwnerService: PetOwnerService
  ) {
  }

  ngOnInit(){
    this.channelId = this.route.snapshot.paramMap.get('channelId');

    if (this.channelId) {
      const [petOwnerId, shelterId] = this.channelId.split('-');
      this.petOwnerService.getPetOwnerByID(petOwnerId).subscribe(data => {
        this.activeUser = data; this.shelterService.getShelterByID(shelterId).subscribe(data => {
          this.otherUser = data;
          this.chatService.startChat(this.activeUser!, this.otherUser);
        })
      })

    }
  }


}
