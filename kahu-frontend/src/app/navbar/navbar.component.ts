import {Component, OnInit} from '@angular/core';
import {PetOwner} from '../models/pet-owner';
import {LoginService} from '../services/login.service';
import {NavbarService} from '../services/navbar.service';
import {Router} from '@angular/router';
import {Shelter} from '../models/shelter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loggedInProfile?: PetOwner|Shelter;

  constructor(private loginService: LoginService, private navbarService: NavbarService, private router: Router) {
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
    this.router.navigate([""])

}

  updateNavbar(): void {
    this.checkForProfile();
  }

  get isPetOwner(): boolean{
    return this.loginService.isPetOwner(this.loggedInProfile);
  }

}
