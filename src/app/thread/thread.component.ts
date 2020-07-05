import { Component, OnInit } from '@angular/core';
import { Thread } from '../thread';
import { Comment } from '../comment';
import { ThreadService } from './thread.service';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})


export class ThreadComponent implements OnInit {

	thread: any;
	msg: any;
	
	constructor(private service : ThreadService) { }

	ngOnInit(): void {
		this.service.getThreads().subscribe((result: any)=>{
			this.thread = result; }, (err)=>{ this.msg = err; });
	}

}
