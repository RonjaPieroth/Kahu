import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarUpdateSubject = new BehaviorSubject<void>(undefined);

  navbarUpdated$ = this.navbarUpdateSubject.asObservable();

  updateNavbar() {
    this.navbarUpdateSubject.next();
  }
}
