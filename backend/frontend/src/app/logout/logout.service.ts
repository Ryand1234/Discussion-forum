import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

	private url = "/api/user/logout";

	constructor(private http : HttpClient) { }

	logout() {
		return this.http.get(this.url);
	}
}
