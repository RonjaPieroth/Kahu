import {Component, EventEmitter, Output} from '@angular/core';
import {Login} from '../../models/login';
import {Shelter} from '../../models/shelter';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ShelterService} from '../../services/shelter.service';
import {NavbarService} from '../../services/navbar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shelter-form',
  templateUrl: './shelter-form.component.html',
  styleUrl: './shelter-form.component.css'
})
export class ShelterFormComponent {
  login?: Login;
  profile?: Shelter;
  @Output() createdProfile = new EventEmitter();
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private shelterService: ShelterService, private navbarService: NavbarService, private router: Router) {
    this.profileForm = fb.group(
      {
        id: [],
        name: ["", [Validators.required]],
        profileText: [],
        login: [],
        pointOfContact: [],
        website: [],
        mailAddress: [],
        hoursOfOperation: [],
        pets: [[]],
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
    )
  }

  ngOnInit() {
    this.loginService.getProfile().subscribe(data => {
      this.login = data;
      if (data.profile && !this.loginService.isPetOwner(data.profile)) {
        this.profile = data.profile;
        const newValues = {
          id: this.profile.id,
          name: this.profile.name,
          profileText: this.profile.profileText,
          pointOfContact: this.profile.pointOfContact,
          website: this.profile.website,
          mailAddress: this.profile.mailAddress,
          hoursOfOperation: this.profile.hoursOfOperation,
          pets: this.profile.pets,
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
      }
      if (this.login) {
        this.profileForm.patchValue({login: {id: this.login.id, mail: this.login.mail, password: this.login.password}});
      }
    });
  }

  submitProfile() {
    let newProfile: Shelter = this.profileForm.value;
    console.log(newProfile)
    if (this.profile) {
      this.updateProfile(newProfile);
      return;
    }
    this.createProfile(newProfile);
  }

  updateProfile(profile: Shelter) {
    this.shelterService.modifyProfil(profile).subscribe(data => {
      console.log("profile has been updated:")
      console.log(data);
      this.router.navigate(["/profile"])
    })
  }

  createProfile(profile: Shelter): void {
    this.shelterService.createProfil(profile).subscribe(data => {
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
