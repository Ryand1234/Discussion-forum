import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewService {
	
	private url = '/api/thread/new';
	constructor(private http : HttpClient) { }
	
	private token: string = 'Bearer ' + localStorage.getItem('token')

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',
			'authorization': this.token
	});

	create(thread: any) {
		return this.http.post(this.url, thread, { headers: this.httpOptions, responseType: 'json'});
	}
}
