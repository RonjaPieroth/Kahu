import {Component, OnInit} from '@angular/core';
import {ChannelService, ChatClientService, StreamI18nService} from 'stream-chat-angular';
import {TokenOrProvider, User} from 'stream-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  // Beispiel für die Benutzer
  petOwnerId = '1'; // ID des zukünftigen Tierbesitzers
  shelterId = '2';  // ID des Tierheims
  apiKey = '8ej3jr8f5dgw'; // API Key von Stream

  petOwnerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.c3dPfJYDGGPBVims5mvYN10znN2m4bg-JIbhSkfGf8o'; // Token für den PetOwner
  shelterToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiJ9.FLCSPsljeBJBOwIpT01GiQ2Q2svw08m7iYp9hzSq31c';   // Token für das Shelter

  // Aktiver Benutzer (PetOwner)
  activeUserId = '2';  // ID des aktiven Benutzers (kann auch dynamically geändert werden)
  activeUser!: User;
  otherUser!: User;
  activeToken!: TokenOrProvider;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService
  ) {
    this.streamI18nService.setTranslation(); // Optional für mehrsprachige Unterstützung
  }

  async ngOnInit() {

    // Bestimme den aktiven Benutzer (PetOwner oder Shelter)
    if (this.activeUserId === this.petOwnerId) {
      this.activeUser = {
        id: this.petOwnerId,
        name: 'Pet Owner',
        image: 'example-pics/example profile-pic.jpg',
      };
      this.otherUser = {
        id: this.shelterId,
        name: 'Animal Shelter',
        image: 'example-pics/felipa.jpg',
      };
      this.activeToken = this.petOwnerToken;
    } else {
      this.activeUser = {
        id: this.shelterId,
        name: 'Animal Shelter',
        image: 'example-pics/shelter-profile-pic.jpg',
      };
      this.otherUser = {
        id: this.petOwnerId,
        name: 'Pet Owner',
        image: 'example-pics/pet-owner-profile-pic.jpg',
      };
      this.activeToken = this.shelterToken;
    }

    // Verbinde den aktiven Benutzer mit Stream-Chat
    await this.chatService.init(this.apiKey, this.activeUser, this.activeToken);
    await this.chatService.chatClient.connectUser(this.activeUser, this.activeToken);

    // Erstelle den Channel, der zwischen dem aktiven Benutzer und dem anderen Benutzer funktioniert
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-pets', {
      name: "test",
    });

    // Channel erstellen, falls er noch nicht existiert
    await channel.create();

    // Channel initialisieren
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-pets' },
    });

    console.log('Aktiver Benutzer verbunden, Channel bereit.');
  }


}
