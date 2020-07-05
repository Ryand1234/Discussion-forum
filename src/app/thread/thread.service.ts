import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ThreadService {

	private url = '/api/thread/all';	

	constructor(private http : HttpClient) { }

	getThreads() {
		
		return this.http.get(this.url);
	}


}
