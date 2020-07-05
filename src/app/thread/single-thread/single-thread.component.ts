import { Component, OnInit } from '@angular/core';
import { Thread } from '../../thread';
import { Comment } from '../../comment';
import { GetThreadService } from './get-thread.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from './post.service';
import { LikeDislikeService } from './like-dislike.service';



@Component({
  selector: 'app-single-thread',
  templateUrl: './single-thread.component.html',
  styleUrls: ['./single-thread.component.css']
})

export class SingleThreadComponent implements OnInit {

	thread: any;
	msg: any;
	
	post = new FormGroup({
	txt : new FormControl('')
	});
	
	history : any ;
	constructor(private service : GetThreadService,
		    private router : Router,
		    private postService : PostService,
		    private likdisService : LikeDislikeService) { }

	token: string;
  	ngOnInit(): void {
		var url = this.router.url;
		this.token = url.split('/')[2];

		this.service.getThread(this.token).subscribe((result: any)=>{
		
			this.thread = result;
		this.history = this.thread.history;
		},
		(err)=>{
			this.msg = err
			});
		

	}

	output: any;

	onSubmit() {

	var data = {
	  "txt" : this.post.value.txt
	}
	this.postService.comment(this.token, data).subscribe((result:any)=>{
		this.output = result;		
		if(this.output.msg == undefined)
		{
			this.thread = result;
			this.history = this.thread.history;	
		}
		else
			this.msg = result;
	}, (err)=>{this.msg = err;});

	}

	
	like(id: string){
		this.likdisService.like(id).subscribe((result : any)=>{
		this.output = result;
		if(this.output.msg == undefined)
		{
			this.thread = result;
			this.history = this.thread.history;
		}
		else
			this.msg = result;
		},(err) => {this.msg = err;});

	}	

	
	dislike(id : string){

		this.likdisService.dislike(id).subscribe((result : any)=>{
                this.output = result;
                if(this.output.msg == undefined)
                {
                        this.thread = result;
			this.history = this.thread.history;
			console.log("TH: ",this.thread);
                }
                else
                        this.msg = result;
                },(err) => {this.msg = err;});
	}

}
