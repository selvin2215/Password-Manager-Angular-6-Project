import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPassDetails } from '../ipass-details';

import { ApiService } from '../db/api.service';

@Component({
  selector: 'pwd-add-update-form',
  templateUrl: './add-update-form.component.html',
  styleUrls: ['./add-update-form.component.css']
})
export class AddUpdateFormComponent implements OnInit {
	@Input('edit') isEdit : number;
	@Input('editDetails') editDetails : IPassDetails;
	@Output('SubmitDetails') sendDetails = new EventEmitter<any>();
	showPwd : boolean = false;
	pwdMeter : any[] = [
		{ class : "text-danger", text : 'Weak'},
		{ class : "text-warning", text : 'Medium'},
		{ class : "text-success", text : 'Strong'},
		{ class : "text-success", text : 'Very Strong'}
	];
	selPwdMeter : any = this.pwdMeter[0];

  	PasswordForm : FormGroup;
  	socialTypeArr : any[];

	constructor(private fb : FormBuilder, private apiService : ApiService) { 		
		
	}
	PasswordMeter() {
		let pwd = this.PasswordForm.get('password').value;
		let pwdLen = pwd.length, i = -1;
		let hasNumber = /\d/.test(pwd);
        let hasUpper = /[A-Z]/.test(pwd);
        let hasSpecialChar = /[$$!@%*#?&]/.test(pwd);
        if(pwdLen >= 6){
        	i++;
        }
        if(pwdLen >= 6 && hasUpper){
        	i++;
        }
        if(pwdLen >= 6 && hasNumber){
        	i++;
        }
        if(pwdLen >= 6 && hasSpecialChar){
        	i++;
        }
        this.selPwdMeter = i > -1 ? this.pwdMeter[i] : this.pwdMeter[0];
	}

	ngOnInit() {
		this.GetSocialTypes();
		this.PasswordForm = this.fb.group({
			pwdId : 0,
			socialType : [ 0, Validators.required],
			nickName : [ '', [Validators.required, Validators.minLength(5)]],
			userName : [ '', [Validators.required]],
			password : ['', [Validators.required, Validators.minLength(6)]],
			description : ''
		});
		
		if(this.isEdit == 1){
			this.PasswordForm.setValue({ pwdId : this.editDetails.pwdId, socialType : this.editDetails.socialType, nickName : this.editDetails.nickName, userName : this.editDetails.userName, password : this.editDetails.password, description : this.editDetails.description});
			this.PasswordMeter();
		}
	}

	GetSocialTypes() {
		this.apiService.GetSocialTypeList()
			.subscribe((response) => {
				if(response.error == 0){
					this.socialTypeArr = response.data;
				}else{
					//need alert
				}
			}, error => {
				console.log(error);
			});
	}

	GetSocialTypeClass() : any{
		return {
			'text-danger' : this.PasswordForm.get('socialType').touched && this.PasswordForm.get('socialType').invalid && this.PasswordForm.controls.socialType.hasError('required'), 
			'text-muted' : !(this.PasswordForm.get('socialType').touched && this.PasswordForm.get('socialType').invalid && this.PasswordForm.controls.socialType.hasError('required'))			
			}
	}

	GetPasswordClass() : any{
		return {
			'text-danger' : this.PasswordForm.get('password').touched && this.PasswordForm.get('password').invalid && ( this.PasswordForm.controls.password.hasError('required')  || this.PasswordForm.controls.password.hasError('minlength')), 
			'text-muted' : !(this.PasswordForm.get('password').touched && this.PasswordForm.get('password').invalid && ( this.PasswordForm.controls.password.hasError('required')  || this.PasswordForm.controls.password.hasError('minlength')))
			}
	}

	SavePasswordForm(){
		this.sendDetails.emit(this.PasswordForm.value);
	}

	TogglePassword(){
		this.showPwd = !this.showPwd;
	}

}
