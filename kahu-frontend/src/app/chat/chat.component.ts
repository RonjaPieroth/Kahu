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
    const apiKey = "8ej3jr8f5dgw";
    const userId = '1';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.c3dPfJYDGGPBVims5mvYN10znN2m4bg-JIbhSkfGf8o';
    const userName = 'Anna Roberts';

    const user: User = {
      id: userId,
      name: userName,
      image: `example-pics/example profile-pic.jpg`,
    };

    this.chatService.init(apiKey, user, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-pets', {
      // add as many custom fields as you'd like
      name: 'Mailbox',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-pets' },
    });
  }
}
