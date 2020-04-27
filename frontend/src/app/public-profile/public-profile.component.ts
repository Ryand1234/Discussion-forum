import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

	userinfo : any;
  constructor(private service : ProfileService,
		private router : Router) { }

                msg: any;

  ngOnInit(){

	var url = this.router.url
	var token = url.split('/')[2]
        this.service.getProfile(token).subscribe((result)=>{ this.userinfo = result}, (error)=>{
  this.msg = error
  });

        }

}
