const router = require('express').Router()
const { MongoClient } = require('mongodb')

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000"

router.get('/:id', async (req, res, next)=>{

    MongoClient.connect(MONGO_URI, (err, client)=>{

    	if(err)
    	{
    		res.status(500).json({"msg" : "Internal Server Error"});
    	}
    	else
    	{
    		var db = client.db('forum');

    		db.collection('user').findOne({accessToken : req.params.id}, (error, user)=>{
    			if(error)
    			{
    				res.status(500).json({"msg" : "Error while opening profile "});
    			}
    			else
    			{
    				if(user == null)
    					res.status(500).json({"msg" : "User Profile Deleted/Missing!!!!!"});
    				else
    				{
    					var threads = user.thread;
                        var obj = new Array();
                        var thread_obj = new Array();
                        var response = {
                                name : user.name,
                                mobile : user.mobile,
                                email : user.email
                        };
                        if(threads != undefined){
                            for(var i = 0; i < threads.length; i++){

                                db.collection('thread').findOne({_id : threads[i]}, (errorTh, thread)=>{

                                    if(errorTh)
                                            res.status(500).json({"msg" : "Internal Server Error"});
                                    else {
                                        var th = {
                                                topic : thread.topic,
                                                id : thread._id
                                        };
                                        if(thread_obj == undefined)
                                                thread_obj = [th]
                                        else
                                                thread_obj.push(th)

                                        if(thread_obj.length == threads.length)
                                        {
                                                response["thread"] = thread_obj
                                                res.status(200).json(response)
                                        }
                                    }
                                });
                            }
                        }
                        else
		                res.status(200).json(response);
    				}
    			}
    		});
    	}
    });
});


module.exports = router;
