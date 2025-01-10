import { Injectable } from '@angular/core';
import {Channel, StreamChat} from 'stream-chat';
import {Shelter} from '../models/shelter';
import {PetOwner} from '../models/pet-owner';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatClient: StreamChat;
  private activeChannel: Channel | null = null;



  constructor() {
    this.chatClient = new StreamChat('8ej3jr8f5dgw');
  }

  async connectUser(user: Shelter | PetOwner /*userToken: string*/): Promise<void> {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.c3dPfJYDGGPBVims5mvYN10znN2m4bg-JIbhSkfGf8o';
console.log(user.id);
    try {
      // Überprüfen, ob der User bereits verbunden ist
      if (!this.chatClient.userID) {
        await this.chatClient.connectUser(
          {
            id: user.id!,
            name: user.name,
          },
          userToken
        );
      }
    } catch (error) {
      console.error('Fehler beim Verbinden des Nutzers:', error);
      throw error;
    }
  }



  // Chat-Kanal erstellen oder bestehenden Kanal laden
  async startChat(activeUser: Shelter|PetOwner, otherUser: Shelter|PetOwner): Promise<Channel> {
    // Channel-ID generieren

    await this.connectUser(activeUser);
    const channelId = `${activeUser.id}-${otherUser.id}`;

    // Prüfen, ob der Kanal bereits existiert
    const storedChannelId = localStorage.getItem('activeChannelId');
    if (storedChannelId === channelId && this.activeChannel) {
      return this.activeChannel;
    }

    // Kanal erstellen
    const channel = this.chatClient.channel('messaging', channelId, {
      members: [activeUser.id!, otherUser.id!],
    });

    // Kanal speichern und beobachten
    await channel.watch();
    this.activeChannel = channel;
    localStorage.setItem('activeChannelId', channelId); // Kanal-ID im localStorage speichern

    return channel;
  }

  getActiveChannel(): Channel | null {
    return this.activeChannel;
  }
}
