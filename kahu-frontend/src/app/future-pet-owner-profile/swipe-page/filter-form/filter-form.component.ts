import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalType} from '../../../models/enums/animal-type';
import {PetOwnershipType} from '../../../models/enums/pet-ownership-type';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.css'
})
export class FilterFormComponent {
  ownerShipTypeArray = Object.values(PetOwnershipType);
  animalTypeArray = Object.values(AnimalType);
  activeTemplate: TemplateRef<any>| null = null;

  @ViewChild("ageTemplate", {static: true}) ageTemplate!: TemplateRef<any>;
  @ViewChild("animalTypeTemplate", {static: true}) animalTypeTemplate!: TemplateRef<any>;
  @ViewChild("genderTemplate", {static: true}) genderTemplate!: TemplateRef<any>;
  @ViewChild("adoptionTypeTemplate", {static: true}) adoptionTypeTemplate!: TemplateRef<any>;

  minAgeControl = new FormControl("",[Validators.min(0)]);
  maxAgeControl =  new FormControl("", [Validators.min(0)]);
  genderControl = new FormControl("");
  animalTypeControl = new FormControl("");
  adoptionTypeControl = new FormControl("");


  @Output() ageEvent = new EventEmitter<{minAge?: number, maxAge?: number}>();
  @Output() genderEvent = new EventEmitter;
  @Output() animalTypeEvent = new EventEmitter;
  @Output() adoptionTypeEvent = new EventEmitter;

  setAgeFilter():void{
    this.ageEvent.emit({
      minAge: this.minAgeControl.value? parseInt(this.minAgeControl.value) : undefined,
      maxAge: this.maxAgeControl.value? parseInt(this.maxAgeControl.value) : undefined})
  }

  setGenderFilter(): void{
    this.genderEvent.emit(this.genderControl.value);
  }

  setAnimalTypeFilter(): void{
    this.animalTypeEvent.emit(this.animalTypeControl.value);
  }

  setAdoptionTypeFilter(): void{
    this.adoptionTypeEvent.emit(this.adoptionTypeControl.value);
  }

  get ageFilterValid(): boolean{
    if (this.minAgeControl.value && this.maxAgeControl.value && this.minAgeControl.value > this.maxAgeControl.value){
      return false;
    }
    return true;
  }


  constructor() {
  }

}
