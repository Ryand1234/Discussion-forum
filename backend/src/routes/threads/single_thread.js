const router = require('express').Router();
const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;



router.get('/:id', (req, res, next)=>{

	const id = req.params.id;

	mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
	
		if(error)
		{
			res.status(200).json({"msg" : "Internal Server Error"});
		}
		else
		{
			const db = client.db('forum');

			var ObjectId = new objectId(id);

			db.collection('thread').findOne({_id : ObjectId}, (err, thread)=>{
			
				if(err)
				{
					res.status(200).json({"msg" : "Cannot find requested thread"});
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
