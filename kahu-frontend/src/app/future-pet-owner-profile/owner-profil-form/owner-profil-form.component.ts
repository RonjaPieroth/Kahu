import {Component, EventEmitter, Output} from '@angular/core';
import {ResidentialArea} from '../../models/enums/residential-area';
import {TypeOfHome} from '../../models/enums/type-of-home';
import {PetOwnershipType} from '../../models/enums/pet-ownership-type';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PetOwner} from '../../models/pet-owner';
import {minSelectedCheckboxes} from '../../validators/min-selected-checkboxes.validators';
import {Login} from '../../models/login';
import {LoginService} from '../../services/login.service';
import {PetOwnerService} from '../../services/pet-owner.service';
import {NavbarService} from '../../services/navbar.service';
import {Router} from '@angular/router';
import { captureError } from 'rxjs/internal/util/errorContext';
import { LocationIqService } from '../../services/location-iq.service';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-owner-profil-form',
  templateUrl: './owner-profil-form.component.html',
  styleUrl: './owner-profil-form.component.css'
})
export class OwnerProfilFormComponent {
  login?: Login;
  profile?: PetOwner;
  @Output() createdProfile = new EventEmitter();
  errorMessage?: string;


  residentialAreaArray = Object.values(ResidentialArea);
  typeOfHomeArray = Object.values(TypeOfHome);
  ownerShipTypeArray = Object.values(PetOwnershipType)

  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private petOwnerService: PetOwnerService, private navbarService: NavbarService, private router: Router, private locationIqService: LocationIqService) {

    this.profileForm = fb.group(
      { id: [],
        login: [],
        name: ["", [Validators.required]],
        age: ["", Validators.required],
        hasExperience: ["", Validators.required],
        profilePicture: [""],
        profileText: [""],
        hasChildren: [Validators.required],
        hasPets: [Validators.required],
        typeOfHome: [Validators.required],
        residentialArea: ["", Validators.required],
        homeSize: ["", [Validators.required, Validators.min(1)]],
        hasGarden: ["", Validators.required],
        lookingFor: this.fb.array([], minSelectedCheckboxes(1)),
        pictures: this.fb.array([]),
        matches: [[]],
        address: fb.group(
                  {
                    country: ["", [Validators.required]],
                    streetName: ["", [Validators.required]],
                    houseNumber: ["", Validators.required],
                    postalCode: ["", Validators.required],
                    city: ["", Validators.required]
                  }
                )
      }
    );
  }

  ngOnInit() {
    this.loginService.getProfile().subscribe(data => {
      this.login = data;
      if (data.profile && this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
        const newValues = {
          id: this.profile.id,
          name: this.profile.name,
          age: this.profile.age,
          hasExperience: this.profile.hasExperience.toString(),
          profilePicture: this.profile.profilePicture,
          profileText: this.profile.profileText,
          hasChildren: this.profile.hasChildren.toString(),
          hasPets: this.profile.hasPets.toString(),
          typeOfHome: this.profile.typeOfHome,
          residentialArea: this.profile.residentialArea,
          homeSize: this.profile.homeSize,
          hasGarden: this.profile.hasGarden.toString(),
          lookingFor: this.profile.lookingFor,
          matches: this.profile.matches,
          address: (
                      {
                        country: this.profile.address.country,
                        streetName: this.profile.address.streetName,
                        houseNumber: this.profile.address.houseNumber,
                        postalCode: this.profile.address.postalCode,
                        city: this.profile.address.city
                      }
                    )
        };
        this.profileForm.patchValue(newValues);
        const lookingForArray = this.profileForm.get('lookingFor') as FormArray;
        lookingForArray.clear();
        newValues.lookingFor.forEach(value => {
          lookingForArray.push(this.fb.control(value));
        });
        this.profile.pictures.forEach((picture: string) => {
          this.picturesArray.push(this.fb.control(picture, Validators.required));
        });}
      if (this.login) {
        this.profileForm.patchValue({login: {id: this.login.id, mail: this.login.mail, password: this.login.password}});
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
    let newProfile: PetOwner = this.profileForm.value;
    console.log(newProfile)
    if (this.profile){
      this.updateProfile(newProfile);
      return;
    }
    this.createProfile(newProfile);
  }

  updateProfile(profile: PetOwner) {
    this.petOwnerService.modifyProfil(profile).subscribe({next: data => {
      console.log("profile has been updated:")
      console.log(data);
      this.router.navigate(["/profile"]);
    },
   error: (error) => {this.errorMessage = error.message}
    });
  }

  createProfile(profile: PetOwner): void {
    this.petOwnerService.createProfil(profile).subscribe(data => {
      console.log("profile has been created:")
        console.log(data);
        this.profileCreated();
        this.navbarService.updateNavbar();
      }
    );
  }

  profileCreated() {
    this.createdProfile.emit()
  }

}
