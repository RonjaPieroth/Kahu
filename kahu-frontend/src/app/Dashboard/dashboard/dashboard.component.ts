import {Component, Input} from '@angular/core';
import {Shelter} from '../../models/shelter';
import {PetOwner} from '../../models/pet-owner';
import {images} from '../images';
import {quotes} from '../quotes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() profile?: Shelter|PetOwner;
  quote: string;
  image: string;

  constructor() {
    this.quote = this.getRandomQuote();
    this.image = this.getRandomImage();
  }

  getRandomIndex(arr: string[]): number{
    return Math.floor(Math.random()*arr.length);
  }

  getRandomQuote(): string{
  return quotes[this.getRandomIndex(quotes)];
  }

  getRandomImage(): string{
    return images[this.getRandomIndex(images)];
  }

}
