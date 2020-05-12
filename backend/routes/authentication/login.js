#!/usr/bin/env node
const router = require('express').Router();
const mongo = require('mongodb');
const session = require('express-session');
const {check, validationResult} = require('express-validator');

router.post('/', 
[
	check('email').isEmail().isLength({min: 1}),
	check('passwd').isAlphanumeric().isLength({min: 6}),
],
async (req, res, next)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty())
	{
		//console.log("Error: ",errors.array());
		var errors_array = errors.array();
		res.status(200).json({errors_array});
	}
	else
	{
		//console.log("URL : ",process.env.MONGO_URL);
		mongo.MongoClient.connect('mongodb://localhost:5000', (err, client)=>{
			if(err)
			{
				//console.log("ERROR: ",err);
				res.status(200).json({"msg" : "Internal Server Error"})
			}
			else
			{
				const db = client.db('forum');
				db.collection('user').findOne({email: req.body.email, password: req.body.passwd}, (error, user)=>{
			
					if(error)
					{
						//console.log("Error: ",error);
						res.status(200).json({"msg" : "Email/Password incorrect"});
					}
					else
					{
						if(user != null)
						{
							req.session.accessToken = user._id;
							req.session.threadToken = user.accessToken;
							req.session.user = user.name;
							//console.log("User Logged IN");
							res.status(200).json({"msg" : "User Logged In"});
						}
						else
							res.status(200).json({"msg" : "Email/Password incorrect"});
					}
				});
			}
		});
	}
});

module.exports = router;
