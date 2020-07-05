import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

	private url = "/api/search/";

	constructor(private http : HttpClient) { }

	getThread(data: any) {
//		console.log("data: ",data);
		return this.http.post(this.url, data);
	}
}
