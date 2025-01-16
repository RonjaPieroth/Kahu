import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Shelter} from '../models/shelter';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  url: string = "http://localhost:8080/shelter"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  createProfile(shelter: Shelter): Observable<Shelter>{
    return this.http.post<Shelter>(this.url, shelter, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  getShelterByID(id: string): Observable<Shelter>{
    return this.http.get<Shelter>(this.url + "/" + id, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  modifyProfil(shelter: Shelter): Observable<Shelter>{
    return this.http.put<Shelter>(this.url, shelter, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }
}
