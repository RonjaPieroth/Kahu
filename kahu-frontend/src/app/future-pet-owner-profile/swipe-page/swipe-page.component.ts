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
  allPets?: Pet[];
  profile?: PetOwner;
  pets?: Pet[];

  constructor(private petService: PetService, private loginService: LoginService, private petOwnerService: PetOwnerService) {
    loginService.getProfile().subscribe(data => {
      if (this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
      }
      petService.getAllPets().subscribe(data => {this.allPets = data; this.chooseRandomPet();});
    })

  }

  chooseRandomPet(): void {
    let pets = this.allPets;
    pets = pets!.filter(pet => !this.profile?.matches.includes(pet));
    this.pets = pets;
    const randomIndex = Math.floor(Math.random() * pets.length);
    this.pet = pets[randomIndex];
  }

  isMatch():void{
    this.profile?.matches.push(this.pet!);
    this.petOwnerService.modifyProfil(this.profile!).subscribe(()=> this.chooseRandomPet());
  }

  isNoMatch(): void{
    this.chooseRandomPet();
  }

}
