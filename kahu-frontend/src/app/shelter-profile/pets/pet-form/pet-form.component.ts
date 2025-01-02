import {Component} from '@angular/core';
import {PetOwnershipType} from '../../../models/enums/pet-ownership-type';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import {minSelectedCheckboxes} from '../../../validators/min-selected-checkboxes.validators';
import {Shelter} from '../../../models/shelter';
import {Pet} from '../../../models/pet';
import {ShelterService} from '../../../services/shelter.service';
import {AnimalType} from '../../../models/enums/animal-type';
import {PetService} from '../../../services/pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  shelterProfile?: Shelter;
  petProfile?: Pet;
  ownerShipTypeArray = Object.values(PetOwnershipType);
  animalTypeArray = Object.values(AnimalType);
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private petService: PetService, private shelterService: ShelterService, private router: Router) {

    this.profileForm = fb.group(
      {
        id: [],
        name: ["", [Validators.required]],
        animalType: ["", Validators.required],
        age: ["", Validators.required],
        gender: ["", Validators.required],
        isNeutered: [Validators.required],
        healthStatus: ["", Validators.required],
        profileText: ["", Validators.required],
        requirements: ["", Validators.required],
        adoptionFee: ["", Validators.required],
        lookingFor: this.fb.array([], minSelectedCheckboxes(1)),
        pictures: this.fb.array([]),
        shelter: [],
        matches: [[]]
      }
    );
  }

  ngOnInit() {
    this.loginService.getProfile().subscribe(data => {
      if (data.profile && !this.loginService.isPetOwner(data.profile)) {
        this.shelterProfile = data.profile;
        if (this.petProfile) {
          const newValues = {
            id: this.petProfile.id,
            name: this.petProfile.name,
            animalType: this.petProfile.animalType,
            age: this.petProfile.age,
            gender: this.petProfile.gender,
            isNeutered: this.petProfile.isNeutered,
            healthStatus: this.petProfile.healthStatus,
            profileText: this.petProfile.profileText,
            requirements: this.petProfile.requirements,
            adoptionFee: this.petProfile.adoptionFee,
            lookingFor: this.petProfile.lookingFor,
            pictures: this.petProfile.pictures,
            shelter: this.petProfile.shelter,
            matches: this.petProfile.matches
          };
          this.profileForm.patchValue(newValues);
          const lookingForArray = this.profileForm.get('lookingFor') as FormArray;
          lookingForArray.clear();
          newValues.lookingFor.forEach(value => {
            lookingForArray.push(this.fb.control(value));
          });

        } else {
          this.profileForm.patchValue({shelter: {id: this.shelterProfile.id}});
        }
      }
    });
  }

  get picturesArray(): FormArray {
    return this.profileForm.get('pictures') as FormArray;
  }

  addPicture(): void {
    this.picturesArray.push(this.fb.control(''));
  }

  removePicture(index: number): void {
    this.picturesArray.removeAt(index);
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const formArray: FormArray = this.profileForm.get('lookingFor') as FormArray;

    if (checkbox.checked) {
      formArray.push(this.fb.control(checkbox.value));
    } else {
      const index = formArray.controls.findIndex(control => control.value === checkbox.value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  get lookingForArray(): string[] {
    return (this.profileForm.get('lookingFor') as FormArray).value;
  }

  submitProfile() {
    let newProfile: Pet = this.profileForm.value;
    console.log(newProfile)
    if (this.petProfile) {
      this.updateProfile(newProfile);
      return;
    }
    this.createProfile(newProfile);
  }

  updateProfile(profile: Pet) {
    this.petService.modifyProfil(profile).subscribe(data => {
      console.log("profile has been updated:")
      console.log(data);
      this.router.navigate(["/profile"])
    })
  }

  createProfile(profile: Pet): void {
    this.shelterProfile?.pets.push(profile);
    if (this.shelterProfile) {
      this.shelterService.modifyProfil(this.shelterProfile).subscribe(data => {
        this.petService.createProfil(profile).subscribe(data => {
            console.log("profile has been created:")
            console.log(data);
            this.router.navigate(["/pets"])
          })
      })
    }
  }
}
