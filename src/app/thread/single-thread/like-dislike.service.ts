import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {


	private like_url = '/api/thread/like/';
	private dislike_url = '/api/thread/dislike/';

	constructor(private http : HttpClient) { }

	like(id: string){
		var nlike_url = this.like_url + id;
		return this.http.get(nlike_url);
	}

	dislike(id: string){
		var ndislike_url = this.dislike_url + id;
		return this.http.get(ndislike_url)
	}	
}
