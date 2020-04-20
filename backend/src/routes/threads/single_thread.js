const router = require('express').Router();
const mongo = require('mongodb');


router.use('/:id', (req, res, next)=>{

	const id = req.params.id;

	mongo.MongoClient.connect(process.env.MONGO_URL, (error, client)=>{
	
		if(error)
		{
			res.status(401).json({"msg" : "Internal Server Error"});
		}
		else
		{
			const db = client.db('forum');

			db.collection('thread').findOne({_id : id}, (err, thread)+>{
			
				if(err)
				{
					res.status(401).json({"msg" : "Cannot find requested thread"});
				}
				else
				{
					res.status(200).json({
						"topic" : thread.topic,
						"user" : thread.user_name,
						"thread" : thread.thread,
						"history" : thread.history
					});
				}
			});
		}
	});
});


module.exports = router;
