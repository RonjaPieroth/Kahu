import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {ActivatedRoute, Router} from '@angular/router';
import {ShelterService} from '../../services/shelter.service';
import {ChatService} from '../../services/chat.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile-page-shelter',
  templateUrl: './profile-page-shelter.component.html',
  styleUrl: './profile-page-shelter.component.css'
})
export class ProfilePageShelterComponent {


  shelterProfile?: Shelter;
  visitingProfile?: Shelter | PetOwner;
  urlID?: string | null;
  message = new FormControl("", [Validators.required]);

  constructor(private loginService: LoginService, private route: ActivatedRoute, private shelterService: ShelterService, private router: Router, private chatService: ChatService) {
    this.urlID = route.snapshot.paramMap.get("id");

    this.checkForProfile();
  }

  checkForProfile(): void {
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.visitingProfile = data.profile
          if (!this.urlID && !this.loginService.isPetOwner(this.visitingProfile)) {
            this.shelterProfile = this.visitingProfile;
          }
          if (this.urlID) {
            console.log(this.urlID);
            this.shelterService.getShelterByID(this.urlID).subscribe(data => this.shelterProfile = data);
          }
        }
      });
    }
  }

  sendMessage(): void {
    if (this.message.value && this.visitingProfile?.id && this.shelterProfile?.id)
      this.chatService.saveMessage({
        message: this.message.value,
        timestamp: new Date(),
        senderId: this.visitingProfile.id,
        recipientId: this.shelterProfile.id
      }).subscribe(data => {
        console.log(data);
        this.message.reset();
        const closeButton = document.getElementById("closeButton")
        closeButton!.click();
        this.router.navigate(["/mailbox"])
      });
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";

  }

  protected readonly console = console;
}
