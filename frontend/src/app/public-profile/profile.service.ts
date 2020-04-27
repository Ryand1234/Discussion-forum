import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

	private url = '/api/user/';
  constructor(private  http : HttpClient) { }

	getProfile(token: string){
		var nurl = this.url + token
                return this.http.get(nurl);
        }
}
