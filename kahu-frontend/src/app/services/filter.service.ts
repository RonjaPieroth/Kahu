import {Injectable} from '@angular/core';
import {Pet} from '../models/pet';
import {AnimalType} from '../models/enums/animal-type';
import {PetOwnershipType} from '../models/enums/pet-ownership-type';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
  }

  filterByAge(pets: Pet[], minAge?: number, maxAge?: number): Pet[] {
    if (minAge && maxAge) {
     return pets.filter(pet => pet.age >= minAge && pet.age <= maxAge)}
    if (minAge) {
     return pets.filter(pet => pet.age >= minAge)}
    if (maxAge) {
     return  pets.filter(pet => pet.age <= maxAge)
    }
    return pets;
  }

  filterByAnimalType(pets: Pet[], animalType: AnimalType): Pet[] {
     return pets.filter(pet => pet.animalType == animalType);
  }

  filterByGender(pets: Pet[], gender: "Male" | "Female"): Pet[] {
   return pets.filter(pet => pet.gender === gender);
  }

  filterByAdoptionType(pets: Pet[], adoptionType: PetOwnershipType): Pet[] {
    return pets.filter(pet => pet.lookingFor.includes(adoptionType))
  }

  /* filterByDistance(pets: Pet[], location: string, maxDistance: number): Pet[] {
     let filteredPets = pets;

     return filteredPets;
   }*/
}
