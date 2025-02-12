import { Injectable } from '@angular/core';
import { PetOwner } from '../models/pet-owner';
import { Shelter } from '../models/shelter';

@Injectable({
  providedIn: 'root',
})
export class LocationIqService {
  constructor() {}

  getDistanceInKm(user1: PetOwner | Shelter, user2: PetOwner | Shelter): number {
    const lat1: number = user1.address.lat!;
    const lat2: number = user2.address.lat!;
    const lon1: number = user1.address.lon!;
    const lon2: number = user2.address.lon!;
    const radius: number = 6371;

    const dLat: number = (lat1 - lat2) * (Math.PI / 180);
    const dLon: number = (lon1 - lon2) * (Math.PI / 180);
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
  }
}
