const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')
const {check, validationResult} = require('express-validator')
const authenticate = require('../../middleware/middleware')
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000"

router.post('/:token', 
[
	check('txt').isLength({min:1}),
],
authenticate,
async (req, res, next)=>{

	var errorValidation = validationResult(req);
	if(!errorValidation.isEmpty())
		res.status(500).json({"msg" : "Text Cannot be empty"});
	else
	{
		var token = req.user.accessToken
		MongoClient.connect(MONGO_URI, (error, client)=>{

			if(error)
				res.status(500).json({"msg" : "Internal Server Error"});

			var db = client.db('forum');

			db.collection('thread').findOne({_id : new ObjectId(token)}, (err, thread)=>{

				var nhistory = {
					user : req.user.name,
					comment : req.body.txt,
					userToken : req.user.threadToken
				};

				var new_history = thread.history;

				new_history.push(nhistory);

				var query = {
					$set : {
						history : new_history
					}
				}

				db.collection('thread').updateOne({_id : new ObjectId(token)}, query, (errUp, update)=>{
				
					if(errUp)
						res.status(500).json({"msg" : "Internal Server Error"});

					db.collection('thread').findOne({_id : new ObjectId(token)}, (errLas, new_thread)=>{
						if(errLas)
							res.status(500).json({"msg" : "Internal Server Error"});

						res.status(200).json(new_thread);
					});
				});
			});
		});
	}

});

module.exports = router;
