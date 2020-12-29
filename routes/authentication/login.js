const router = require('express').Router();
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb');
const {check, validationResult} = require('express-validator');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000";

router.post('/', 
[
	check('email').isEmail().isLength({min: 1}),
	check('passwd').isAlphanumeric().isLength({min: 6}),
],
async (req, res, next)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty())
	{
		var errors_array = errors.array();
		res.status(501).json({errors_array});
	}
	else
	{
		MongoClient.connect(MONGO_URI, (err, client)=>{
			if(err)
			{
				res.status(500).json({"msg" : "Internal Server Error"})
			}
			else
			{
				const db = client.db('forum');
				db.collection('user').findOne({email: req.body.email, password: req.body.passwd}, (error, user)=>{
			
					if(error)
					{
						res.status(500).json({"msg" : "Email/Password incorrect"});
					}
					else
					{
						if(user != null)
						{
							const user = {
								accessToken: user._id,
								threadToken: user.accessToken,
								name: user.name
							}

							const token = jwt.sign(user, process.env.JWT_SECRET)
							console.log("T: ", token)

							res.status(200).json({"msg" : "User Logged In", token: token});
						}
						else
							res.status(500).json({"msg" : "Email/Password incorrect"});
					}
				});
			}
		});
	}
});

module.exports = router;
