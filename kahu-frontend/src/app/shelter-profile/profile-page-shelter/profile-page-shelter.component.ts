import { Component } from '@angular/core';
import {PetOwner} from '../../models/pet-owner';
import {LoginService} from '../../services/login.service';
import {Shelter} from '../../models/shelter';

@Component({
  selector: 'app-profile-page-shelter',
  templateUrl: './profile-page-shelter.component.html',
  styleUrl: './profile-page-shelter.component.css'
})
export class ProfilePageShelterComponent {

  profile?: Shelter;

  constructor(private loginService: LoginService) {
    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile && !this.loginService.isPetOwner(data.profile)) {
          this.profile = data.profile
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }
}
