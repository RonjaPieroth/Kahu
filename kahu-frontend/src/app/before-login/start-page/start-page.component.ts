import { Component } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

  user?: User;
}
