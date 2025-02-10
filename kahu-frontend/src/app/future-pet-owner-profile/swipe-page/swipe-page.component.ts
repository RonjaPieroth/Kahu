import {Component} from '@angular/core';
import {Pet} from '../../models/pet';
import {PetOwner} from '../../models/pet-owner';
import {PetService} from '../../services/pet.service';
import {LoginService} from '../../services/login.service';
import {PetOwnerService} from '../../services/pet-owner.service';
import {AnimalType} from '../../models/enums/animal-type';
import {PetOwnershipType} from '../../models/enums/pet-ownership-type';
import {FilterService} from '../../services/filter.service';

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
  filteredPets: Pet[] = [];
  isLoading: boolean = true;

  minAge?: number;
  maxAge?: number;
  gender?: "Male" | "Female";
  animalType?: AnimalType;
  adoptionType?: PetOwnershipType;

  constructor(private petService: PetService, private loginService: LoginService, private petOwnerService: PetOwnerService, private filterService: FilterService) {
    loginService.getProfile().subscribe(data => {
      if (this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
      }
      petService.getAllPets().subscribe(data => {
        this.allPets = data;
        this.filteredPets = data;
        this.chooseRandomPet();
        this.isLoading = false;
      });
    })
  }

  loadMatchablePets(): Pet[] {
    return this.filteredPets.filter(
      pet => !(this.profile?.matches.some(match => match.id === pet.id || this.profile?.noMatchIds.some(id => id === pet.id)))
    );
  }

  resetNoMatchList(): void{
    this.profile!.noMatchIds = [];
    this.petOwnerService.modifyProfil(this.profile!).subscribe(() => this.chooseRandomPet());
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
    if (this.pet?.id){
    this.profile?.noMatchIds.push(this.pet!.id);
      this.petOwnerService.modifyProfil(this.profile!).subscribe(() => this.chooseRandomPet());
    }
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
    this.filterPets();
  }

  setGender(gender: "Male"|"Female"): void{
    this.gender = gender;
    this.filterPets();
  }

  setAnimalType(animalType: AnimalType): void{
    this.animalType = animalType;
    this.filterPets();
  }

  setAdoptionType(adoptionType: PetOwnershipType): void{
    this.adoptionType = adoptionType;
    this.filterPets();
  }

  filterPets():void{
    let filteredPets: Pet[]= this.allPets;
    if (this.maxAge || this.minAge){
      filteredPets = this.filterService.filterByAge(filteredPets, this.minAge, this.maxAge);
    }
    if (this.gender){
      filteredPets = this.filterService.filterByGender(filteredPets, this.gender);
    }
    if (this.adoptionType){
      filteredPets = this.filterService.filterByAdoptionType(filteredPets, this.adoptionType);
    }
    if (this.animalType){
      filteredPets = this.filterService.filterByAnimalType(filteredPets, this.animalType);
    }
    this.filteredPets = filteredPets;
    this.chooseRandomPet();
  }
}
