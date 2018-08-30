import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService : AuthService, private storage : LocalStorageService) {

	}
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
		let userDetails = this.storage.get('user');
		if(userDetails && userDetails.token && userDetails.token != '') {
			this.authService.loggedIn.next(true);
			return true;
		} else {
			this.authService.loggedIn.next(false);
			return false;
		}
	}
}
