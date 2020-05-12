import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

	private url = '/api/user/profile';
  constructor(private  http : HttpClient) { }

	getProfile(){
		return this.http.get(this.url);
	}
}
