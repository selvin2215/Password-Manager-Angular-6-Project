import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/authentication/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'pwd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	showLoginForm : boolean = true;
	constructor(private auth : AuthService, private router : Router) {

	}

	ngOnInit() {
	}
	ToggleForms(){
		this.showLoginForm = !this.showLoginForm;
	}
}
