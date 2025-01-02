import { Component } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Shelter} from '../../models/shelter';
import {PetService} from '../../services/pet.service';



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

  protected readonly console = console;
}
