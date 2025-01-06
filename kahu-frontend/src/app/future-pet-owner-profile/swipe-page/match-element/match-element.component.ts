import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pet} from '../../../models/pet';
import {PetService} from '../../../services/pet.service';
import {LoginService} from '../../../services/login.service';
import {PetOwner} from '../../../models/pet-owner';

@Component({
  selector: 'app-match-element',
  templateUrl: './match-element.component.html',
  styleUrl: './match-element.component.css'
})
export class MatchElementComponent {

  @Input() pet?: Pet;

  @Output() matchEvent = new EventEmitter();
  @Output() noMatchEvent = new EventEmitter();

  match(){
    this.matchEvent.emit();
  }

  noMatch(){
    this.noMatchEvent.emit();
  }

}
