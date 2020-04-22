const router = require('express').Router();
const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;


router.get('/', async (req, res, next)=>{

	//console.log("TOKEN: ",req.session.accessToken);
	mongo.MongoClient.connect('mongodb://localhost:5000', (err, client)=>{

		if(err)
		{
			res.status(200).json({"msg" : "Internal Server Error"});
		}
		else
		{
			var db = client.db('forum');


			db.collection('user').findOne({_id : new objectId(req.session.accessToken)}, (error, user)=>{
				if(error)
				{
					res.status(200).json({"msg" : "Please Login to view profile "});
				}
				else
				{
					if(user == null)
						res.status(200).json({"msg" : "Please Login to view profile"});
					else
						res.status(200).json(user);
				}
			});
		}
	});

});


module.exports = router;
