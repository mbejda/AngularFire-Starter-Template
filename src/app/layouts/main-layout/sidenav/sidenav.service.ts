import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  open() {
    this.isOpenSubject.next(true);
  }
}

