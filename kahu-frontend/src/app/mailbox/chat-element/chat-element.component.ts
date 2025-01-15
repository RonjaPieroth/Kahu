import {Component, Input} from '@angular/core';
import {Chat} from '../../models/chat';

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrl: './chat-element.component.css'
})
export class ChatElementComponent {

  @Input() chat?: Chat;

}
