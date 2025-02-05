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
    let filteredPets = pets;
    if (minAge && maxAge) {
      filteredPets = filteredPets.filter(pet => pet.age >= minAge && pet.age <= maxAge)
    } else if (minAge) {
      filteredPets = filteredPets.filter(pet => pet.age >= minAge)
    } else if (maxAge) {
      filteredPets = filteredPets.filter(pet => pet.age <= maxAge)
    }
    return filteredPets;
  }

  filterByAnimalType(pets: Pet[], animalType: AnimalType): Pet[] {
    let filteredPets = pets;
    filteredPets.filter(pet => pet.animalType == animalType);
    return filteredPets;
  }

  filterByGender(pets: Pet[], gender: "Male" | "Female"): Pet[] {
    let filteredPets = pets;
    filteredPets.filter(pet => pet.gender === gender);
    return filteredPets;
  }

  filterByAdoptionType(pets: Pet[], adoptionType: PetOwnershipType): Pet[] {
    let filteredPets = pets;
    filteredPets.filter(pet => pet.lookingFor.includes(adoptionType))
    return filteredPets;
  }

  /* filterByDistance(pets: Pet[], location: string, maxDistance: number): Pet[] {
     let filteredPets = pets;

     return filteredPets;
   }*/
}
