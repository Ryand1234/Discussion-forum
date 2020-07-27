import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ThreadService {

	private url = '/api/thread/all';	

	constructor(private http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	getThreads() {
		
		return this.http.post(this.url, { headers: this.httpOptions, responseType: 'json'});
	}


}
