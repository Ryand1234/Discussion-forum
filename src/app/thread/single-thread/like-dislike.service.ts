import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {


	private like_url = '/api/thread/like/';
	private dislike_url = '/api/thread/dislike/';

	constructor(private http : HttpClient) { }

	httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

	like(id: string){
		var nlike_url = this.like_url + id;
		return this.http.post(nlike_url, { headers: this.httpOptions, responseType: 'json'});
	}

	dislike(id: string){
		var ndislike_url = this.dislike_url + id;
		return this.http.post(ndislike_url, { headers: this.httpOptions, responseType: 'json'})
	}	
}
