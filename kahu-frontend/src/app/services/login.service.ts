import { Injectable } from '@angular/core';
import {Login} from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  checkLogin(login: Login): boolean{
    return true;
  }
}
