import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

	info = new FormGroup({
	email : new FormControl(''),
	passwd : new FormControl('')
	});

  constructor(private service : LoginService,
  		private router: Router
  	) { }

  	ngOnInit(): void {
  		if(localStorage.getItem('token') != undefined) {
  			this.router.navigate(['/home'])
  		}
  	}

	msg: any;

  	onSubmit() {
	//	console.log("data: ",this.info);
		var login = {
		email : this.info.value.email,
		passwd : this.info.value.passwd
		};

		this.service.login(login).subscribe((result: any)=>{
			this.msg = result;
			window.location.reload();
		}, (err)=>{ this.msg = err});
	//	console.log("Error: ",this.msg);
	}

}
