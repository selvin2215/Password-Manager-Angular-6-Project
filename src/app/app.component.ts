import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/authentication/auth.service';

import { Observable } from 'rxjs';
import { map, tap, take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'iPass';
  isAuthenticated : boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, public authService : AuthService){
  }

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
	}

  Logout(){
    this.authService.loggedIn.next(false);
  	this.authService.signOut();
  }
}
