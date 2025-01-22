import { Component } from '@angular/core';
import {PetOwner} from '../../models/pet-owner';
import {LoginService} from '../../services/login.service';
import {PetOwnershipType} from '../../models/enums/pet-ownership-type';
import {ActivatedRoute, Router} from '@angular/router';
import {Shelter} from '../../models/shelter';
import {PetOwnerService} from '../../services/pet-owner.service';
import {FormControl, Validators} from '@angular/forms';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-profile-page-pet-owner',
  templateUrl: './profile-page-pet-owner.component.html',
  styleUrl: './profile-page-pet-owner.component.css'
})
export class ProfilePagePetOwnerComponent {

  petOwnerProfile?: PetOwner;
  visitingProfile?: PetOwner | Shelter
  urlID?: string | null;
  message = new FormControl("", [Validators.required]);

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private petOwnerService: PetOwnerService,
    private chatService: ChatService,
    private router: Router) {
    this.urlID = route.snapshot.paramMap.get("id");

    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.visitingProfile = data.profile;
          if (!this.urlID && this.loginService.isPetOwner(this.visitingProfile)){
            this.petOwnerProfile = this.visitingProfile;
          }
          if (this.urlID){
            console.log(this.urlID);
            this.petOwnerService.getPetOwnerByID(this.urlID).subscribe(data => this.petOwnerProfile = data);
          }
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }

  sendMessage(): void {
    if (this.message.value && this.visitingProfile?.id && this.petOwnerProfile?.id)
      this.chatService.saveMessage({
        message: this.message.value,
        timestamp: new Date(),
        senderId: this.visitingProfile.id,
        recipientId: this.petOwnerProfile.id
      }).subscribe(data => {
        console.log(data);
        this.message.reset();
        this.router.navigate(["/mailbox"])
      });
  }

  protected readonly PetOwnershipType = PetOwnershipType;
}
