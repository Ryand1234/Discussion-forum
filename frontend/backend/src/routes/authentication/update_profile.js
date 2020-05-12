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


		//Database Connection
		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
			var db = client.db('forum');
			db.collection('user').findOne({_id : new mongo.ObjectId(req.session.accessToken)}, (err, user)=>{
				
				if(err)
				{
					//console.log("Internal Server Error");
					res.status(200).json({"msg" : "Internal Server Error"});
				}
				else
				{
					//changes in Profile

					var name,username,mobile;
					if(req.body.name != undefined)
						name = req.body.name;
					else
						name = user.name;

					if(req.body.username != undefined)
						username = req.body.username;
					else
						username = user.username

					if(req.body.mobile != undefined)
						mobile = req.body.mobile
					else
						mobile = user.mobile

					//console.log("User Registered");
					var query = {
						$set : {
							name : name,
							username : username,
							mobile : mobile
						}
					}
					db.collection('user').updateOne({_id : new mongo.ObjectId(req.session.accessToken)}, query, (error, update)=>{
					
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
