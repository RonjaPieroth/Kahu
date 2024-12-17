import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PetOwner} from '../models/pet-owner';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {

  url: string = "http://localhost:8080/pet-owner"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  createProfil(petOwner: PetOwner): Observable<PetOwner>{
    return this.http.post<PetOwner>(this.url, petOwner, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  modifyProfil(user: PetOwner): Observable<PetOwner>{
    return this.http.put<PetOwner>(this.url, user, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }
}
