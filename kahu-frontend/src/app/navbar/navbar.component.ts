import { Component } from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedInUser?: User;

}
