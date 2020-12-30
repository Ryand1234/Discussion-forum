import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

	private url = '/api/user/';
	constructor(private  http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	getProfile(token: string){
			var nurl = this.url + token
            return this.http.post(nurl, { headers: this.httpOptions, responseType: 'json'});
        }
}
