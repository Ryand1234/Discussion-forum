import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

	constructor(private service : LogoutService,
			private router: Router
		) { }

	ngOnInit(): void {
		localStorage.removeItem('token')
		this.router.navigate(['/home'])
	}

}
