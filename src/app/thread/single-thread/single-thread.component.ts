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
	output: any;
	token: string
	loggedIn = false

	post = new FormGroup({
	txt : new FormControl('')
	});
	
	history : any ;
	constructor(private service : GetThreadService,
		    private router : Router,
		    private postService : PostService,
		    private likdisService : LikeDislikeService) { }

  	ngOnInit(): void {
  		if(localStorage.getItem('token') != undefined) {
			this.loggedIn = true
		} else {
			this.msg = 'Please Login to Continue!!!!!!'
		}
		var url = this.router.url;
		this.token = url.split('/')[2];

		this.service.getThread(this.token).subscribe((result: any)=>{
		
			this.thread = result;
			this.history = this.thread.history;
			},
		(err)=>{
			this.msg = err.msg
		});
		

	}


	onSubmit() {

		if(this.loggedIn)
		{
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
			}, (err)=>{this.msg = err.msg;});

		}

	}

	like(id: string){
		if(this.loggedIn)
		{
			this.likdisService.like(id).subscribe((result : any)=>{
			this.output = result;
			if(this.output.msg == undefined)
			{
				this.thread = result;
				this.history = this.thread.history;
			}
			else
				this.msg = result;
			},(err) => {this.msg = err.msg;});
		}
	}	

	
	dislike(id : string){

		if(this.loggedIn)
		{
			this.likdisService.dislike(id).subscribe((result : any)=>{
                this.output = result;
                if(this.output.msg == undefined)
                {
                        this.thread = result;
						this.history = this.thread.history;
				}
				else
                	this.msg = result;
            },(err) => {this.msg = err.msg;});
		}
	}

}
