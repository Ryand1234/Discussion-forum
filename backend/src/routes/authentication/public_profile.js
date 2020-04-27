const router = require('express').Router();
const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;


router.get('/:id', async (req, res, next)=>{

	//console.log("TOKEN: ",req.session.accessToken);
	mongo.MongoClient.connect('mongodb://localhost:5000', (err, client)=>{

		if(err)
		{
			res.status(200).json({"msg" : "Internal Server Error"});
		}
		else
		{
			var db = client.db('forum');


			db.collection('user').findOne({accessToken : req.params.id}, (error, user)=>{
				if(error)
				{
					res.status(200).json({"msg" : "Error while opening profile "});
				}
				else
				{
					if(user == null)
						res.status(200).json({"msg" : "User Profile Deleted/Missing!!!!!"});
					else
						res.status(200).json(user);
				}
			});
		}
	});

});


module.exports = router;
