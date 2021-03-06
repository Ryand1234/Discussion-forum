import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { UpdateService } from './update.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

	user = new FormGroup({
	name : new FormControl(''),
	username : new FormControl(''),
	mobile : new FormControl('')
	});
	loggedIn = false
	msg: any
  constructor(private service : UpdateService) { }

  ngOnInit(): void {
  	if(localStorage.getItem('token') != undefined) {
  		this.loggedIn = true
  	}
  }

  onSubmit() {
	
//	console.log("User: ",this.user);	
		var userinfo : any={};

		if (this.user.value.username != ''){
			userinfo.username = this.user.value.username;
		}
		if (this.user.value.name != ''){
			userinfo.name = this.user.value.name;
		}
		if (this.user.value.mobile != ''){
			userinfo.mobile = this.user.value.mobile;
		}

		console.log("user: ",userinfo);
		this.service.register(userinfo).subscribe((result:any)=>{
		this.msg = result.msg;}, (err)=>{this.msg = err.msg;});
	  }
}
