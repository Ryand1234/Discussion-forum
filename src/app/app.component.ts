import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discussion Forum';
  img_url = 'assets/images/logo.jpg'
  loggedIn = false
  toggle = false

  ngOnInit(): void {
  	if(localStorage.getItem('token') != undefined)
  	{
  		this.loggedIn = true
  	}
  }
  changeLogin() {
    this.loggedIn = false
  }
  change() {
    this.toggle = !this.toggle
  }
}
