import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewService {
	
	private url = '/api/thread/new';
	constructor(private http : HttpClient) { }
	
	create(thread: any) {
		return this.http.post(this.url, thread);
	}
}
