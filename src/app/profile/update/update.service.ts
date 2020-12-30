import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

	private url = '/api/user/update';
  constructor(private http : HttpClient) { }
	
	private token: string = 'Bearer ' + localStorage.getItem('token')

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',
			'authorization': this.token
	});
	register(data: any) {
		return this.http.post(this.url, data, { headers: this.httpOptions, responseType: 'json'});
	}
}
