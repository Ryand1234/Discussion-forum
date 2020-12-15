const router = require('express').Router();
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectId;
const {check, validationResult} = require('express-validator');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000";

router.post('/:token', 
[
	check('txt').isLength({min:1}),
],
async (req, res, next)=>{

	var token = req.params.token;
	if(req.session.accessToken != undefined) 
	{
		var errorValidation = validationResult(req);
		if(!errorValidation.isEmpty())
			res.status(500).json({"msg" : "Text Cannot be empty"});
		else
		{
			MongoClient.connect(MONGO_URI, (error, client)=>{

				if(error)
					res.status(500).json({"msg" : "Internal Server Error"});

				var db = client.db('forum');

				db.collection('thread').findOne({_id : new objectId(token)}, (err, thread)=>{

					var nhistory = {
						user : req.session.user,
						comment : req.body.txt,
						userToken : req.session.threadToken
					};

					var new_history = thread.history;

					new_history.push(nhistory);

					var query = {
						$set : {
							history : new_history
						}
					}

					db.collection('thread').updateOne({_id : new objectId(token)}, query, (errUp, update)=>{
					
						if(errUp)
							res.status(500).json({"msg" : "Internal Server Error"});

						db.collection('thread').findOne({_id : new objectId(token)}, (errLas, new_thread)=>{
							if(errLas)
								res.status(500).json({"msg" : "Internal Server Error"});

							res.status(200).json(new_thread);
						});
					});
				});
			});
		}

	}

	else
		res.status(500).json({"msg" : "Please Login to make a comment"});
});

module.exports = router;
