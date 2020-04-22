import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetThreadService {

	private url = '/api/thread/';	

	constructor(private http : HttpClient) { }

	getThread(token : string) {
	
		var new_url = this.url + token;
		return this.http.get(new_url);
	}
}
