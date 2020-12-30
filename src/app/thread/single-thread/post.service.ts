import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PostService {


	private url = '/api/thread/comment/';
	constructor(private http : HttpClient) { }

	private token: string = 'Bearer ' + localStorage.getItem('token')

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',
			'authorization': this.token
	});

	 comment(token: string, data: any) {
                var nurl = this.url + token;
                return this.http.post(nurl, data, { headers: this.httpOptions, responseType: 'json'});
        }

}
