import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {LoginService} from '../services/login.service';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loggedInProfile?: User;

  constructor(private loginService: LoginService, private navbarService: NavbarService) {
  }

  ngOnInit(): void {
   this.checkForProfile();
    this.navbarService.navbarUpdated$.subscribe(() => {
      this.updateNavbar();
    });
  }

  checkForProfile(): void{
    if (this.loggedIn) {
      this.loginService.getProfile().subscribe(data => {
        if (data.profile) {
          this.loggedInProfile = data.profile
        }
      });
    }
  }

  get loggedIn(): boolean {
    return this.loginService.getToken() != "";
  }

logout():void{
    this.loginService.logout();
}

  updateNavbar(): void {
    this.checkForProfile();
  }

}
