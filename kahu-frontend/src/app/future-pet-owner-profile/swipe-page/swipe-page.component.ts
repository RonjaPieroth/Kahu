import {Component} from '@angular/core';
import {Pet} from '../../models/pet';
import {PetOwner} from '../../models/pet-owner';
import {PetService} from '../../services/pet.service';
import {LoginService} from '../../services/login.service';
import {PetOwnerService} from '../../services/pet-owner.service';
import {AnimalType} from '../../models/enums/animal-type';
import {PetOwnershipType} from '../../models/enums/pet-ownership-type';

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
  isLoading: boolean = true;

  minAge?: number;
  maxAge?: number;
  gender?: "Male" | "Female";
  animalType?: AnimalType;
  adoptionType?: PetOwnershipType;

  constructor(private petService: PetService, private loginService: LoginService, private petOwnerService: PetOwnerService) {
    loginService.getProfile().subscribe(data => {
      if (this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
      }
      petService.getAllPets().subscribe(data => {
        this.allPets = data;
        this.chooseRandomPet();
        this.isLoading = false;
      });
    })
  }

  loadMatchablePets(): Pet[] {
    return this.allPets.filter(
      pet => !this.profile?.matches.some(match => match.id === pet.id)
    );
  }

  chooseRandomPet(): void {
    this.pets = this.loadMatchablePets();
    const randomIndex = Math.floor(Math.random() * this.pets.length);
    this.pet = this.pets[randomIndex];
  }

  isMatch(): void {
    this.profile?.matches.push(this.pet!);
    this.petOwnerService.modifyProfil(this.profile!).subscribe(() => this.chooseRandomPet());
  }

  isNoMatch(): void {
    this.chooseRandomPet();
  }

  setAge(age: { minAge?: number; maxAge?: number }):void{
    if (age.minAge){
      this.minAge = age.minAge;
    }
    if (age.maxAge){
      this.maxAge = age.maxAge;
    }
    if (this.maxAge && this.minAge && this.minAge > this.maxAge){
      this.minAge = undefined;
    }
  }

  setGender(gender: "Male"|"Female"): void{
    this.gender = gender;
  }

  setAnimalType(animalType: AnimalType): void{
    this.animalType = animalType;
  }

  setAdoptionType(adoptionType: PetOwnershipType): void{
    this.adoptionType = adoptionType;
  }

}
