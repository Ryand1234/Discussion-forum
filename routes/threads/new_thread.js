const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')
const {check, validationResult} = require('express-validator')
const authenticate = require('../../middleware/middleware')
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:5000"

router.post('/',
[
	check('topic').isLength({min : 3}),
	check('thread').isLength({min : 3}),
	check('category').isLength({min : 1}),
],
authenticate,
async (req, res, next)=>{

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
		nthread.user = req.user.threadToken;
		nthread.user_name = req.user.name;
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
						db.collection('user').findOne({_id : new ObjectId(req.user.accessToken)}, (errorUser, user)=>{
						
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

							db.collection('user').updateOne({_id : new ObjectId(req.user.accessToken)}, query, (errorUp, User)=>{
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
});

module.exports = router;

