import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PostService {


	private url = '/api/thread/comment/';
	constructor(private http : HttpClient) { }

	 comment(token: string, data: any) {
                var nurl = this.url + token;
                return this.http.post(nurl, data);
        }

}
