const router = require('express').Router();
const mongo = require('mongodb');

router.get('/', async (req, res, next)=>{

	mongo.MongoClient.connect(process.env.MONGO_URL, (error, client)=>{
	
		if(error)
		{
			res.status(401).json({"msg" : "Internal Server Error"});
		}
		else
		{
			var db = client.db('forum');

			db.collection('thread').find({}).toArray((err, threads)=>{
			
				if(err)
				{
					res.status(401).json({"msg" : "Internal Server Error"});
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
