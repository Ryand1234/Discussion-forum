const router = require('express').Router()
const mongo = require('mongodb')



router.get('/:id', async (req, res, next)=>{

	if(req.session.accessToken == undefined)
		res.status(200).json({"msg" : "Please Log in to like a post"});
	else{

		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
			if(error)
			{
				//console.log("Error: ",error);
				res.status(200).json({"msg" : "Internal Server Error"})
			}
			else{

				var db = client.db('forum');
				db.collection('thread').findOne({_id : new mongo.ObjectId(req.params.id)}, (Error, thread)=>{
					if(Error)
						res.status(200).json({"msg" : "Internal Server Error"});
					else{
						var dislike = thread.dislikes;
						
						if(dislike == undefined)
							dislike = 0;

						var query = {
							$set : {
								dislikes : dislike - 1
							}
						};

						db.collection('thread').updateOne({_id : new mongo.ObjectId(req.params.id)}, query, (err, update)=>{
							if(err)
								res.status(200).json({"msg" : "Internal Server Error"});
						});

						db.collection('thread').findOne({_id : new mongo.ObjectId(req.params.id)}, (Error, updThread)=>{
                		                        if(Error)
		                                                res.status(200).json({"msg" : "Internal Server Error"});
                                		        else{
								res.status(200).json(updThread);			
							}

						});

					}
				});
			}
		});
	}
});

module.exports = router;
