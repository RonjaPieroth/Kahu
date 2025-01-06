import { Component } from '@angular/core';
import {Pet} from '../../models/pet';
import {PetOwner} from '../../models/pet-owner';
import {PetService} from '../../services/pet.service';
import {LoginService} from '../../services/login.service';
import {PetOwnerService} from '../../services/pet-owner.service';

@Component({
  selector: 'app-swipe-page',
  templateUrl: './swipe-page.component.html',
  styleUrl: './swipe-page.component.css'
})
export class SwipePageComponent {

  pet?: Pet;
  allPets: Pet[] = [];
  profile?: PetOwner;
  pets: Pet[] = [];

  constructor(private petService: PetService, private loginService: LoginService, private petOwnerService: PetOwnerService) {
    loginService.getProfile().subscribe(data => {
      if (this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
      }
      petService.getAllPets().subscribe(data => {this.allPets = data; this.chooseRandomPet();});
    })
  }

  loadMatchablePets(): Pet[]{
    return this.allPets.filter(
      pet => !this.profile?.matches.some(match => match.id === pet.id)
    );
  }

  chooseRandomPet(): void {
    this.pets = this.loadMatchablePets();
    const randomIndex = Math.floor(Math.random() * this.pets.length);
    this.pet = this.pets[randomIndex];
  }

  isMatch():void{
    this.profile?.matches.push(this.pet!);
    this.petOwnerService.modifyProfil(this.profile!).subscribe(()=> this.chooseRandomPet());
  }

  isNoMatch(): void{
    this.chooseRandomPet();
  }

}
