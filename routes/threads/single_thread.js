const router = require('express').Router();
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectId;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000";

router.post('/:id', (req, res, next)=>{

	const id = req.params.id;

	MongoClient.connect(MONGO_URI, (error, client)=>{
	
		if(error)
		{
			res.status(500).json({"msg" : "Internal Server Error"});
		}
		else
		{
			const db = client.db('forum');

			var ObjectId = new objectId(id);

			db.collection('thread').findOne({_id : ObjectId}, (err, thread)=>{
			
				if(err)
				{
					res.status(500).json({"msg" : "Cannot find requested thread"});
				}
				else
				{
					res.status(200).json(thread);
				}
			});
		}
	});
});


module.exports = router;
