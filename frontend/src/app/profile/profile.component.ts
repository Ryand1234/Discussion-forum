import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { ProfileService } from './profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	
	userinfo : any;
  constructor(private service : ProfileService) { }

  		msg: any;

  ngOnInit(){

	this.service.getProfile().subscribe((result)=>{ this.userinfo = result}, (error)=>{
  this.msg = error
  });
	
	}


}
