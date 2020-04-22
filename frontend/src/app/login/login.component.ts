import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	info = new FormGroup({
	email : new FormControl(''),
	passwd : new FormControl('')
	});

  constructor(private service : LoginService) { }

	msg: any;

  	onSubmit() {
	//	console.log("data: ",this.info);
		var login = {
		email : this.info.value.email,
		passwd : this.info.value.passwd
		};

		this.service.login(login).subscribe((result: any)=>{
		this.msg = result;}, (err)=>{ this.msg = err});
	//	console.log("Error: ",this.msg);
	}

}
