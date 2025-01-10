import { Component } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {ActivatedRoute, Router} from '@angular/router';
import {ShelterService} from '../../services/shelter.service';



@Component({
  selector: 'app-profile-page-shelter',
  templateUrl: './profile-page-shelter.component.html',
  styleUrl: './profile-page-shelter.component.css'
})
export class ProfilePageShelterComponent {

  shelterProfile?: Shelter;
  visitingProfile?: Shelter | PetOwner;
  urlID?: string | null;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private shelterService: ShelterService, private router: Router) {
    this.urlID = route.snapshot.paramMap.get("id");

    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.visitingProfile = data.profile
          if (!this.urlID && !this.loginService.isPetOwner(this.visitingProfile)){
            this.shelterProfile = this.visitingProfile;
          }
          if (this.urlID){
            console.log(this.urlID);
            this.shelterService.getShelterByID(this.urlID).subscribe(data => this.shelterProfile = data);
          }
        }
      });
    }
  }

  startChat(){
    const channelId = `${this.visitingProfile?.id}-${this.shelterProfile?.id}`;
    this.router.navigate(['/mailbox', channelId]);

  }


  get loggedIn(): boolean {
    return this.loginService.getToken() != "";

  }

  protected readonly console = console;
}
