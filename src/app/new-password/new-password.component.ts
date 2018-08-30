import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IAddPassDetails } from '../common/ipass-details';
import { Router } from '@angular/router';
import { ApiService } from '../common/db/api.service';
@Component({
  selector: 'pwd-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
	title : string = 'Add Password';
	isEdit : number = 0;

	constructor(private router : Router, private apiService : ApiService){

	}
	ngOnInit(){

	}
	AddNewPassword(pwdDetails : IAddPassDetails){
		this.apiService.AddPassword(pwdDetails)
			.subscribe((response) => {
				if(response.error == 0){
					this.router.navigate(['/dashboard']);
				}else{

				}
			}, error => {

			});
	}

}
