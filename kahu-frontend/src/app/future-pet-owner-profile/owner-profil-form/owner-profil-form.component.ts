import {Component, EventEmitter, Output} from '@angular/core';
import {ResidentialArea} from '../../models/residential-area';
import {TypeOfHome} from '../../models/type-of-home';
import {PetOwnershipType} from '../../models/pet-ownership-type';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {minSelectedCheckboxes} from '../../validators/min-selected-checkboxes.validators';
import {Login} from '../../models/login';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {NavbarService} from '../../services/navbar.service';


@Component({
  selector: 'app-owner-profil-form',
  templateUrl: './owner-profil-form.component.html',
  styleUrl: './owner-profil-form.component.css'
})
export class OwnerProfilFormComponent {
  login?: Login;
  @Output() createdProfile = new EventEmitter();




  residentialAreaArray = Object.values(ResidentialArea);
  typeOfHomeArray = Object.values(TypeOfHome);
  ownerShipTypeArray = Object.values(PetOwnershipType)

  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private userService: UserService, private navbarService: NavbarService) {

    this.profileForm = fb.group(
      {
        login: [],
        name: ["", [Validators.required]],
        age: ["", Validators.required],
        postalCode: ["", Validators.required],
        hasExperience: ["", Validators.required],
        profilePicture: [""],
        profileText: [""],
        hasChildren:[Validators.required],
        hasPets:[Validators.required],
        typeOfHome:[Validators.required],
        residentialArea: ["",Validators.required],
        homeSize: ["",[Validators.required, Validators.min(1)]],
        hasGarden: ["",Validators.required],
        lookingFor: this.fb.array([], minSelectedCheckboxes(1)),
        likedPets: [[]],
        matches: [[]]
      }
    );
  }

  ngOnInit() {
    this.loginService.getProfile().subscribe(data => {
      this.login = data;
      if (this.login) {
        this.profileForm.patchValue({ login: {id: this.login.id, mail: this.login.mail, password: this.login.password} });
      }
    });
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

  submitProfile(){
    let newProfile: User = this.profileForm.value;
    console.log(newProfile)
    this.userService.createProfil(newProfile).subscribe(data => {
      console.log(data);
     this.profileCreated();
     this.navbarService.updateNavbar();
    }
    );
  }

  profileCreated(){
    this.createdProfile.emit()
  }

}
