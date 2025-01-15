import {Component, Input} from '@angular/core';
import {Chat} from '../../models/chat';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrl: './chat-overview.component.css'
})
export class ChatOverviewComponent {

  @Input() chats?: Chat[];

}
