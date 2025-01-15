import { Injectable } from '@angular/core';
import {Login} from '../models/login';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse} from '../models/login-response';
import {PetOwner} from '../models/pet-owner';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getToken(): string {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return JSON.parse(token);
      } catch (error) {
        console.error('Error parsing token:', error);
        return '';
      }
    }
    return '';
  }

  signup(registeredLogin: Login): Observable<Login>{
    return this.http.post<Login>(this.url + "auth/signup", registeredLogin);
  }

  login(login: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url +"auth/login", login);
  }

  logout():void{
    localStorage.removeItem("token");
  }

  getProfile(): Observable<Login>{
    return this.http.get<Login>(this.url + "login/me", {
      headers: {
        authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  modifyLogin(login: Login): Observable<Login>{
    return this.http.put<Login>(this.url + "login", login, {headers: {
      authorization: `Bearer ${this.getToken()}`
    }
  });
}

 isPetOwner(obj: any): obj is PetOwner {
    return obj && typeof obj.name === 'string' && typeof obj.age === 'number';
  }
}
