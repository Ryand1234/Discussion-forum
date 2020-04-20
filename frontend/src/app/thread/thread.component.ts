import { Component, OnInit } from '@angular/core';
import { Thread } from '../thread';
import { Comment } from '../comment';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})


export class ThreadComponent implements OnInit {

	thread: Thread;
	nhistory = [
			
			new Comment('riyan', "login to your account", new Date() ),
			new Comment('Aman', "select the user to send message", new Date() ),
			new Comment('Jill', "write msg in txt box and send it", new Date() )

			]
		

	history : any = new Array();
	//constructor() { }

	ngOnInit(): void {
		this.thread = new Thread('Messaging', 'How to send Messages from facebook', 'Internet');
		this.history = this.nhistory;
		console.log("Thread: ",this.thread);
	}

}
