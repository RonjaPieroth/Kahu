import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/user"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  createProfil(user: User): Observable<User>{
    return this.http.post<User>(this.url, user, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

}
