const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000"

router.post('/:id', async (req, res, next)=>{

	MongoClient.connect(MONGO_URI, (error, client)=>{
		
		if(error)
		{
			res.status(500).json({"msg" : "Internal Server Error"})
		}
		else{

			var db = client.db('forum');
			db.collection('thread').findOne({_id : new ObjectId(req.params.id)}, (Error, thread)=>{
				if(Error)
					res.status(500).json({"msg" : "Internal Server Error"});
				else{
					var like = thread.likes;
					
					if(like == undefined)
						like = 0;

					var query = {
						$set : {
							likes : like + 1
						}
					};

					db.collection('thread').updateOne({_id : new ObjectId(req.params.id)},query,  (err, update)=>{
						if(err)
							res.status(500).json({"msg" : "Internal Server Error"});
					});

					db.collection('thread').findOne({_id : new ObjectId(req.params.id)}, (Error, updThread)=>{
						if(Error)
						        res.status(500).json({"msg" : "Internal Server Error"});
						else{
							res.status(200).json(updThread);
						}
					});
				}
			});
		}
	})
});

module.exports = router;
