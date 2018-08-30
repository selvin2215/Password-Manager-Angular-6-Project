import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pwd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	title : string = 'List of passswords';
	constructor() { }

	ngOnInit() {
	}

}
