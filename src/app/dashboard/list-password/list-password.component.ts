import { Component, OnInit } from '@angular/core';
import { IPassDetails } from '../../common/ipass-details';
import { ApiService } from '../../common/db/api.service';

@Component({
  selector: 'pwd-list-password',
  templateUrl: './list-password.component.html',
  styles: []
})
export class ListPasswordComponent implements OnInit {
	passwordList : IPassDetails[];
	showPassword : boolean = false;
	loading : boolean = false;

	constructor(private apiService : ApiService) { }

	trackId(index, pwdList){
		return pwdList ? pwdList.userId : undefined;
	}

	ngOnInit() {
		this.loading = true;
		this.apiService.GetPasswordList()
			.subscribe((response) => {
				if(response.error == 0){
					this.passwordList = response.data;
					this.loading = false;
				}else{

				}
			}, error => {

			});
	}
	
	TogglePassword(pwd : any){
		let index = this.passwordList.indexOf(pwd);
		this.passwordList[index].showPwd = !this.passwordList[index].showPwd;
	}
}
