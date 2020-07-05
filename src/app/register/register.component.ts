import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	user = new FormGroup({
	name : new FormControl(''),
	username : new FormControl(''),
	email : new FormControl(''),
	passwd : new FormControl(''),
	mobile : new FormControl('')
	});
  constructor(private service : RegisterService) { }

	msg: any;
  onSubmit() {
	
	//console.log("User: ",this.user);	
	var userinfo = new User(this.user.value.username, this.user.value.name, this.user.value.email, this.user.value.passwd, this.user.value.mobile);
	this.service.register(userinfo).subscribe((result:any)=>{
	this.msg = result;}, (err)=>{this.msg = err;});
  }
}
