const router = require('express').Router();
const { MongoClient } = require('mongodb');
const {check, validationResult} = require('express-validator');
const objectId = require('mongodb').ObjectId;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000";

router.post('/',
[
	check('topic').isLength({min : 3}),
	check('thread').isLength({min : 3}),
	check('category').isLength({min : 1}),
],
async (req, res, next)=>{

	
	if(req.session.accessToken != undefined)
	{
		const errors = validationResult(req);

		if(!errors.isEmpty())
		{
			var errors_array = errors.array();
			res.status(500).json({errors_array});
		}
		else
		{

			nthread = {};
			nthread.topic = req.body.topic;
			nthread.user = req.session.threadToken;
			nthread.user_name = req.session.user;
			nthread.category = req.body.category;
			nthread.thread = req.body.thread;
			nthread.history = [];
			nthread.likes = 0;
			nthread.dislikes = 0;


			MongoClient.connect(MONGO_URI, (error, client)=>{
				if(error)
				{
					res.status(500).json({"msg" : "Internal Server Error"});
				}
				else
				{
					var db = client.db('forum');
				
					db.collection('thread').insertOne(nthread, (err, thread)=>{

						if(err)
						{
							res.status(500).json({"msg" : "Interal Server Error"});
						}
						else
						{
							db.collection('user').findOne({_id : new objectId(req.session.accessToken)}, (errorUser, user)=>{
							
								if(errorUser)
									res.status(500).json({"msg" : "Internal Server Error"});
	
								var nhistory;
								if(user.thread == undefined)
								{
									 nhistory = [thread.ops[0]._id];
								}
								else
								{
									nhistory = user.thread;
									nhistory.push(thread.ops[0]._id);
								}
	
								var query = {
									$set : {
										thread : nhistory
									}
								}

								db.collection('user').updateOne({_id : new objectId(req.session.accessToken)}, query, (errorUp, User)=>{
									if(errorUp)
										res.status(500).json({"msg" : "Internal Server Error"});
									res.status(200).json({"msg" : "Thread Created"});
								});
							});
						}
					});
				}
			});

		}
	}

	else
		res.status(500).json({"msg" : "Please login to create a thread"});
});

module.exports = router;

