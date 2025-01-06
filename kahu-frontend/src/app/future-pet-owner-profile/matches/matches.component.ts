import { Component } from '@angular/core';
import {Pet} from '../../models/pet';
import {PetOwner} from '../../models/pet-owner';
import {LoginService} from '../../services/login.service';
import {PetOwnerService} from '../../services/pet-owner.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  matches: Pet[] = [];
  profile?: PetOwner;

  constructor(private loginService: LoginService, private petOwnerService: PetOwnerService) {
    loginService.getProfile().subscribe(data => {
      if (this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
        this.matches = this.profile.matches;
      }})
  }

  removeMatch(pet: Pet): void{
    if(this.profile){
    this.profile.matches = this.profile.matches.filter(match => match.id !== pet.id);
    this.petOwnerService.modifyProfil(this.profile).subscribe(data => this.matches = data.matches);
  }}
}
