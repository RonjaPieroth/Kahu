import {Component} from '@angular/core';
import {PetOwner} from '../../models/pet-owner';
import {LoginService} from '../../services/login.service';
import {Shelter} from '../../models/shelter';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

  isLoading: boolean = true;
  loggedInProfile?: PetOwner | Shelter;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.loggedInProfile = data.profile
          this.isLoading = false;
        }
      },);

    }
  }

  setUser(): void {
    this.loginService.getProfile().subscribe(data => {
      if (data.profile) {
        this.loggedInProfile = data.profile
      }
    })
  }


  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }
}
