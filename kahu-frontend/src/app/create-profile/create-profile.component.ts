import {Component, EventEmitter, Output} from '@angular/core';
import {Login} from '../models/login';
import {Shelter} from '../models/shelter';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {

  @Output() createdProfile = new EventEmitter();
  petOwner: boolean = false;
  shelter: boolean = false;

  constructor() {
  }

  profileCreated() {
    this.createdProfile.emit()
  }



}
