import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

	private url = '/api/user/login';
  constructor(private http : HttpClient) { }

	login(data:any) {
//		console.log("data: ",data);
		return this.http.post(this.url, data);
	}
}
