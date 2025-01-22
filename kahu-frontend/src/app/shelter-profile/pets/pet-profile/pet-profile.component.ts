import {Component, Input} from '@angular/core';
import {Pet} from '../../../models/pet';
import {PetService} from '../../../services/pet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PetOwnershipType} from '../../../models/enums/pet-ownership-type';
import {LoginService} from '../../../services/login.service';
import {PetOwner} from '../../../models/pet-owner';
import {Shelter} from '../../../models/shelter';
import {FormControl, Validators} from '@angular/forms';
import {ChatService} from '../../../services/chat.service';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.css'
})
export class PetProfileComponent {

  @Input() pet?: Pet;
  visitingProfile?: PetOwner|Shelter;
  message = new FormControl("", [Validators.required]);


  constructor(private petService: PetService, private route: ActivatedRoute, private loginService: LoginService, private router: Router, private chatService: ChatService) {
    const id = route.snapshot.paramMap.get("id");

    if (!this.pet && id) {
      this.petService.getPetByID(id).subscribe(data => this.pet = data);
    }
    this.loginService.getProfile().subscribe(data =>
    this.visitingProfile = data.profile);
  }

  get isOwningShelter(): boolean{
    if (this.visitingProfile?.id != this.pet?.shelter.id){return false;}
    return !this.loginService.isPetOwner(this.visitingProfile);
  }

  get isMatch(): boolean{
    return !!(this.loginService.isPetOwner(this.visitingProfile) && this.visitingProfile.matches.find(match => match.id === this.pet?.id));

  }

  sendMessage(): void {
    if (this.message.value && this.visitingProfile?.id && this.pet?.shelter.id)
      this.chatService.saveMessage({
        message: this.message.value,
        timestamp: new Date(),
        senderId: this.visitingProfile.id,
        recipientId: this.pet.shelter.id,
        petId: this.pet.id
      }).subscribe(data => {
        console.log(data);
        this.message.reset();
        this.router.navigate(["/mailbox"])
      });
  }

  protected readonly PetOwnershipType = PetOwnershipType;
}
