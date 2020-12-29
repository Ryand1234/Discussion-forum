import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	
	userinfo : any;
  constructor(private service : ProfileService) { }

  loggedIn = false

  ngOnInit(){
    if(localStorage.getItem('token') != undefined) {
      this.loggedIn = true
    }
	  else {
      this.service.getProfile().subscribe((result)=>{ this.userinfo = result});
    }
	
	}


}
