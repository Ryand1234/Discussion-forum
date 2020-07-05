const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongo = require('mongodb');


router.post('/', 
[
	check('name').isAlpha().isLength({min: 1}),
	check('email').isLength({min: 1}).isEmail(),
	check('passwd').isAlphanumeric().isLength({min:6}),
	check('mobile').isNumeric().isLength({min:10}),
	check('username').isLength({min: 3}),
],
async (req, res, next) => {

		const errors = validationResult(req);
	if(!errors.isEmpty())
	{
		//console.log("ERROR: ",errors.array());
		var error_array = errors.array();
		res.status(200).json({error_array});
	}
	else
	{
		nuser = {};
		nuser.name = req.body.name;
		nuser.email = req.body.email;
		nuser.password = req.body.passwd;
		nuser.mobile = req.body.mobile;
		nuser.username = req.body.username;
		nuser.accessToken = Math.floor(Math.random()*5000000).toString();
		nuser.threads = new Array();
		//console.log("USER: ",nuser);
		
		//console.log(process.env.MONGO_URL);
		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
			var db = client.db('forum');
			db.collection('user').insertOne(nuser, (err, user)=>{
				
				if(err)
				{
					//console.log("Internal Server Error");
					res.status(200).json({"msg" : "Internal Server Error"});
				}
				else
				{
					//console.log("User Registered");
					res.status(200).json({"msg" : "User Registered"});
				}
			});
		});

	}

});

module.exports = router;
