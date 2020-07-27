import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

	private url = '/api/user/profile';
  constructor(private  http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	getProfile(){
		return this.http.get(this.url, { headers: this.httpOptions, responseType: 'json'});
	}
}
