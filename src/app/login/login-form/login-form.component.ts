import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';

import { ApiService } from '../../common/db/api.service';
import { AuthService } from '../../common/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pwd-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	LoginForm : FormGroup;
	@Output('toggleForm') event = new EventEmitter;
	showError : boolean = false;
	errMsg : string = '';
	loading : boolean = false;

	constructor(private fb : FormBuilder, private apiService : ApiService, private router : Router, private storage : LocalStorageService, private authService : AuthService) {
	}

	ngOnInit() {
		this.LoginForm = this.fb.group({
			email : ['', [Validators.required, Validators.email]],
			password : ['', [Validators.required]]
		});
	}
	ToggleForms(){
		this.event.emit();
	}
	LoginUser() {
		this.loading = true;
		this.apiService.UserLogin(this.LoginForm.value)
			.subscribe((response) => {
				this.loading = false;
			    if(response.error == false){
			    	this.storage.set('user', response.data);
    				this.authService.loggedIn.next(true);
			    	this.router.navigate(['/dashboard']);
			    }else{
			    	this.errMsg = response.msg;
			    	this.showError = true;
			    }
			}, (error) => {
				
			});
	}
}
