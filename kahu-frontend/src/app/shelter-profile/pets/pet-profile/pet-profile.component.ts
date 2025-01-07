import {Component, Input} from '@angular/core';
import {Pet} from '../../../models/pet';
import {PetService} from '../../../services/pet.service';
import {ActivatedRoute} from '@angular/router';
import {PetOwnershipType} from '../../../models/enums/pet-ownership-type';
import {LoginService} from '../../../services/login.service';
import {PetOwner} from '../../../models/pet-owner';
import {Shelter} from '../../../models/shelter';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.css'
})
export class PetProfileComponent {

  @Input() pet?: Pet;
  visitingProfile?: PetOwner|Shelter;


  constructor(private petService: PetService, private route: ActivatedRoute, private loginService: LoginService) {
    const id = route.snapshot.paramMap.get("id");

    if (!this.pet && id) {
      this.petService.getPetByID(id).subscribe(data => this.pet = data);
    }
    this.loginService.getProfile().subscribe(data =>
    this.visitingProfile = data.profile);
  }

  get isOwningShelter(): boolean{
    if (this.visitingProfile?.id != this.pet?.shelter.id){return false;}
    return !this.loginService.isPetOwner(this.visitingProfile);
  }

  get isMatch(): boolean{
    return !!(this.loginService.isPetOwner(this.visitingProfile) && this.visitingProfile.matches.find(match => match.id === this.pet?.id));

  }

  protected readonly PetOwnershipType = PetOwnershipType;
}
