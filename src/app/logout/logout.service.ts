import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

	private url = "/api/user/logout";

	constructor(private http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	logout() {
		return this.http.post(this.url, { headers: this.httpOptions, responseType: 'json'});
	}
}
