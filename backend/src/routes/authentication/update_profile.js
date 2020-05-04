const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongo = require('mongodb');


router.post('/', async (req, res, next) => {


	if(req.session.accessToken == undefined)
	{
		res.status(200).json({"msg" : "Please Login to continue"});
	}
	else
	{

		//Changes in Profile
		nuser = {};
		
		if (req.body.name != undefined)
			nuser.name = req.body.name;
	
		if (req.body.mobile != undefined)
			nuser.mobile = req.body.mobile;
	
		if (req.body.username != undefined)
			nuser.username = req.body.username;


		//Database Connection
		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
			var db = client.db('forum');
			db.collection('user').findOne({_id : req.session.accessToken}, (err, user)=>{
				
				if(err)
				{
					//console.log("Internal Server Error");
					res.status(200).json({"msg" : "Internal Server Error"});
				}
				else
				{
					//console.log("User Registered");
					db.collection('user').updateOne({_id : req.session.accessToken}, { $set: nuser }, (error, update)=>{
					
						if(error)
							res.status(200).json({"msg" : "Internal Server Error"});
						else
							res.status(200).json({"msg" : "Profile Updated"});
					});
				}
			});
		});

	}

});

module.exports = router;
