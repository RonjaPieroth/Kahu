import { Component } from '@angular/core';
import {User} from '../../models/user';
import {LoginService} from '../../services/login.service';
import {PetOwnershipType} from '../../models/pet-ownership-type';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  profile?: User;

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
