import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private router: Router, private storage : LocalStorageService) { 
  }

  signOut(): void {
    this.storage.set('user', null);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
