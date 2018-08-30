import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPassDetails } from '../common/ipass-details';

import { ApiService } from '../common/db/api.service';

@Component({
  selector: 'pwd-password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.css']
})
export class PasswordDetailComponent implements OnInit {
	title:string = 'Edit password details';
	isEdit : number = 1;
	editDetails : IPassDetails = null;
	loading : boolean = false;
			
	constructor(private actRoute : ActivatedRoute, private apiService : ApiService, private router : Router) { 
	}

	ngOnInit() {
		this.loading = true;
		let id = this.actRoute.snapshot.paramMap.get('id');
		this.apiService.GetPasswordDetails(id)
			.subscribe((response) => {
				if(response.error == 0){
					this.editDetails = response.data;
				}else{
					//need alert
				}
				this.loading = false;
			}, error => {
				console.log(error);
			});
		
	}
	UpdatePwdDetails(pwdDetails : IPassDetails){
		this.apiService.UpdatePasswordDetails(pwdDetails)
			.subscribe((response) => {
				if(response.error == 0){
					this.router.navigate(['/dashboard']);
				}else{
					//need alert
				}
				this.loading = false;
			}, error => {
				console.log(error);
			});
	}

}
