const router = require('express').Router();
const mongo = require('mongodb');

router.post('/', async (req, res, next)=>{

	mongo.MongoClient.connect(process.env.MONGO_URL, (err, client)=>{

		if(err)
		{
			res.status(401).json({"msg" : "Internal Server Error"});
		}
		else
		{
			var db = client.db('forum');

			db.collection('user').findOne({accessToken : req.session.accessToken}, (error, user)=>{
				if(error)
				{
					res.status(401).json({"msg" : "Please Login to view profile "});
				}
				else
				{
					res.status(200).json(user);
				}
			});
		}
	});

});


module.exports = router;
