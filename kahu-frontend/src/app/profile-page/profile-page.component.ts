import { Component } from '@angular/core';
import {PetOwner} from '../models/pet-owner';
import {Shelter} from '../models/shelter';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  profile?: PetOwner|Shelter;

  constructor(private loginService: LoginService) {
    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile && this.loginService.isPetOwner(data.profile)) {
          this.profile = data.profile
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }

  get isPetOwner(): boolean{
    return this.loginService.isPetOwner(this.profile);
  }
}
