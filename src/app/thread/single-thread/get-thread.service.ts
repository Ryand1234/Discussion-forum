import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetThreadService {

	private url = '/api/thread/';	

	constructor(private http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	getThread(token : string) {
	
		var new_url = this.url + token;
		return this.http.post(new_url, { headers: this.httpOptions, responseType: 'json'});
	}
}
