import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

	constructor(private service : LogoutService) { }

	msg: any;
	onSubmit() {
		this.service.logout().subscribe((result: any)=>{
		this.msg = result}, (err)=>{this.msg = err});
	}
}
