import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

	private url = '/api/user/update';
  constructor(private http : HttpClient) { }
	
	register(data: any) {
		return this.http.post(this.url, data);
	}
}
