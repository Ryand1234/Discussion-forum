const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

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

			db.collection('thread').findOne({_id : new ObjectId(id)}, (err, thread)=>{

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
