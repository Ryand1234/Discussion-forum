const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/middleware')
const { MongoClient, ObjectId } = require('mongodb')

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000"

router.post('/', authenticate, async (req, res, next) => {

	//Database Connection
	MongoClient.connect(MONGO_URI, (error, client)=>{
		
		var db = client.db('forum')
		db.collection('user').findOne({_id : new ObjectId(req.user.accessToken)}, (err, user)=>{
			
			if(err)
			{
				res.status(500).json({"msg" : "Internal Server Error"})
			}
			else
			{
				//changes in Profile
				var name,username,mobile
				if(req.body.name != undefined){
					name = req.body.name
					req.user.name = name
				}
				else
					name = user.name

				if(req.body.username != undefined)
					username = req.body.username
				else
					username = user.username

				if(req.body.mobile != undefined)
					mobile = req.body.mobile
				else
					mobile = user.mobile

				var query = {
					$set : {
						name : name,
						username : username,
						mobile : mobile
					}
				}
				db.collection('user').updateOne({_id : new ObjectId(req.user.accessToken)}, query, (error, update)=>{
				
					if(error)
						res.status(500).json({"msg" : "Internal Server Error"})
					else
						res.status(200).json({"msg" : "Profile Updated"})
				});
			}
		});
	});
});

module.exports = router;
