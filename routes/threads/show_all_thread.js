const router = require('express').Router();
const mongo = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000";

router.get('/', async (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URI, (error, client)=>{
	
		if(error)
		{
			res.status(200).json({"msg" : "Internal Server Error"});
		}
		else
		{
			var db = client.db('forum');

			db.collection('thread').find({}).toArray((err, threads)=>{
			
				if(err)
				{
					res.status(200).json({"msg" : "Internal Server Error"});
				}
				else
				{
					res.status(200).json(threads);
				}
			});
		}
	});
});

module.exports = router;
