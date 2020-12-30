import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	
	userinfo : any;
  constructor(private service : ProfileService,
      private router: Router
    ) { }

  loggedIn: boolean = false

  ngOnInit(){
    if(localStorage.getItem('token') != undefined) {
      this.loggedIn = true
      this.service.getProfile().subscribe((result)=>{ this.userinfo = result});
    }
	
	}

  login() {
    this.router.navigate(['/login'])
  }


}
