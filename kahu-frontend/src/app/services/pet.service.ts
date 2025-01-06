import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Pet} from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {url: string = "http://localhost:8080/pets"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  createProfil(pet: Pet): Observable<Pet>{
    return this.http.post<Pet>(this.url, pet, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  modifyProfil(pet: Pet): Observable<Pet>{
    return this.http.put<Pet>(this.url, pet, {
      headers: {
        authorization: `Bearer ${this.loginService.getToken()}`
      }
    })
  }

  getAllPets(): Observable<Pet[]>{
  return this.http.get<Pet[]>(this.url, {
    headers: {
      authorization: `Bearer ${this.loginService.getToken()}`
    }})
  }

  getPetByID(id: string): Observable<Pet>{
  return this.http.get<Pet>(this.url +"/" +id, {
    headers: {
      authorization: `Bearer ${this.loginService.getToken()}`
    }})
  }

  deletePet(id: Number): Observable<void>{
  return this.http.delete<void>(this.url + "/" + id, {
    headers: {
      authorization: `Bearer ${this.loginService.getToken()}`
    }})}
}
