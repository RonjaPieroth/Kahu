import {Component} from '@angular/core';
import {Pet} from '../../../models/pet';
import {PetService} from '../../../services/pet.service';
import {ActivatedRoute} from '@angular/router';
import {PetOwnershipType} from '../../../models/enums/pet-ownership-type';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.css'
})
export class PetProfileComponent {

  pet?: Pet;

  constructor(private petService: PetService, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get("id");

    if (id) {
      this.petService.getPetByID(id).subscribe(data => this.pet = data);
    }
  }

  protected readonly PetOwnershipType = PetOwnershipType;
}
