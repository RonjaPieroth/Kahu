import {Component, OnInit} from '@angular/core';
import {ChannelService, ChatClientService, StreamI18nService} from 'stream-chat-angular';
import {User} from 'stream-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  constructor(private chatService: ChatClientService,
              private channelService: ChannelService,
              private streamI18nService: StreamI18nService) {
    const apiKey = "dz5f4d5kzrue";
    const userId = 'square-frost-9';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3F1YXJlLWZyb3N0LTkiLCJleHAiOjE3MzYzNDg2NDB9._caHGsOC0NPePGmUXWH7TAJI7cO8dYG1axuw-KJ5Ebs';
    const userName = 'square';

    const user: User = {
      id: userId,
      name: userName,
      image: `https://getstream.io/random_png/?name=${userName}`,
    };

    this.chatService.init(apiKey, user, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-angular' },
    });
  }
}
