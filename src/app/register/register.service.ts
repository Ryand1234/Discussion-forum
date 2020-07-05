import { Injectable } from '@angular/core';
import { User } from '../user'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	private url = '/api/user/register';
  constructor(private http : HttpClient) { }
	
	register(data: User) {
		//console.log("Data: ",data);
		return this.http.post(this.url, data);
	}
}
