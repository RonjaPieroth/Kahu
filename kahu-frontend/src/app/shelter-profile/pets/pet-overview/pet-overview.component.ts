import { Component } from '@angular/core';
import {Shelter} from '../../../models/shelter';
import {Pet} from '../../../models/pet';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-pet-overview',
  templateUrl: './pet-overview.component.html',
  styleUrl: './pet-overview.component.css'
})
export class PetOverviewComponent {

  profile?: Shelter;
  pets: Pet[] = [];

  constructor(private loginService: LoginService) {
    this.checkForProfile();
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile && !this.loginService.isPetOwner(data.profile)) {
          this.profile = data.profile;
          this.pets = data.profile.pets;
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }
}
