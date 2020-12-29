import { Component, OnInit } from '@angular/core';
import { NewService } from './new.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

	thread = new FormGroup({
	topic : new FormControl(''),
	category : new FormControl(''),
	thread : new FormControl('')
	});

	loggedIn = false
	msg: string
	msgError: string

	constructor(private service : NewService) { }


	ngOnInit(): void {
		if(localStorage.getItem('token') != undefined) {
			this.loggedIn = true
		} else {
			this.msgError = 'Please Login to Continue!!!!!!'
		}
	}

	onSubmit() {
		if(this.loggedIn)
		{
			var new_thread = {
				topic : this.thread.value.topic,
				category : this.thread.value.category,
				thread : this.thread.value.thread
				};
			this.service.create(new_thread).subscribe((result: any)=>{
			this.msg = result.msg;}, (err)=>{ this.msgError = err.msg});
		}
	//console.log("msg: ",this.msgError);
	}

}
