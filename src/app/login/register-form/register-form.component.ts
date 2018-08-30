import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';


import { ApiService } from '../../common/db/api.service';
import { AuthService } from '../../common/authentication/auth.service';

@Component({
  selector: 'pwd-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
	RegisterForm : FormGroup;
	@Output('toggleForm') event = new EventEmitter;
	showError : boolean = false;
	errMsg : string = '';
	loading : boolean = false;

	constructor(private fb : FormBuilder, private apiService : ApiService, private authService : AuthService, private storage : LocalStorageService, private router : Router) { }

	ngOnInit() {
		this.RegisterForm = this.fb.group({
			name : ['', [Validators.required, Validators.minLength(5)]],
			email : ['', [Validators.required, Validators.email]],
			password : ['', [Validators.required]],
			agreeTerms : [false]
		});
	}

	ToggleForms(){
		this.event.emit();
	}

	SignUpUser() {
		this.loading = true;
		this.apiService.UserSignUp(this.RegisterForm.value)
			.subscribe((response) => {
				this.loading = false;
			    if(response.error == 0){
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
