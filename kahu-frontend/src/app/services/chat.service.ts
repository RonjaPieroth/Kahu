import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chat} from '../models/chat';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url: string = "http://localhost:8080/messages"

  constructor(private http: HttpClient, private loginService: LoginService) {
    }

  getChats(userId: string): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.url + "/" +userId, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  getChatMessages(chat: Chat): Observable<Message[]>{
    return this.http.post<Message[]>(this.url + "/chat", chat,  {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  saveMessage(message: Message): Observable<Message>{
    return this.http.post<Message>(this.url, message,  {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  }

