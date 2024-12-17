import { Component } from '@angular/core';
import {PetOwner} from '../../models/pet-owner';
import {LoginService} from '../../services/login.service';
import {PetOwnershipType} from '../../models/enums/pet-ownership-type';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  profile?: PetOwner;

  constructor(private loginService: LoginService) {
    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.profile = data.profile
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }

  protected readonly PetOwnershipType = PetOwnershipType;
}
