import { Component, OnInit } from '@angular/core';
import { NewService } from './new.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent {

	thread = new FormGroup({
	topic : new FormControl(''),
	category : new FormControl(''),
	thread : new FormControl('')
	});
	
	constructor(private service : NewService) { }

		msg: any;
		msgError: any;
	onSubmit() {
		//console.log("Thread: ",this.thread);
		var new_thread = {
			topic : this.thread.value.topic,
			category : this.thread.value.category,
			thread : this.thread.value.thread
			};
		this.service.create(new_thread).subscribe((result: any)=>{
		this.msg = result;}, (err)=>{ this.msgError = err});
	//console.log("msg: ",this.msgError);
	}

}
