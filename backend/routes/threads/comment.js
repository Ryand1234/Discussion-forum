const router = require('express').Router();
const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;
const {check, validationResult} = require('express-validator');


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
			res.status(200).json({"msg" : "Text Cannot be empty"});
		else
		{
			mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
				if(error)
					res.status(200).json({"msg" : "Internal Server Error"});

				var db = client.db('forum');
	
				db.collection('thread').findOne({_id : new objectId(token)}, (err, thread)=>{
				
				// thread.history.user.push(req.session.user);
				// thread.history.comment.push(req.body.txt);

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
							res.status(200).json({"msg" : "Internal Server Error"});

						db.collection('thread').findOne({_id : new objectId(token)}, (errLas, new_thread)=>{
							if(errLas)
								res.status(200).json({"msg" : "Internal Server Error"});

							res.status(200).json(new_thread);
						});
					});
				});
			});
		}

	}

	else
		res.status(200).json({"msg" : "Please Login to make a comment"});
});

module.exports = router;
