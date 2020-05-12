import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

	category = new FormGroup({
	cat : new FormControl('')
	});

	constructor(private service : CategoryService) { }

	msg: any;
	thread: any;
	output: any;
	onSubmit() {
//		console.log("Cat: ",this.category);
		var data = {
			category : this.category.value.cat
		};

		this.service.getThread(data).subscribe((result: any)=>{
			this.output = result
			if(this.output.msg == undefined)
			{
				this.thread = result;
			}
			else
				this.msg = result;
		});
	}
	
}
