const router = require('express').Router();
const mongo = require('mongodb');
const {check, validationResult} = require('express-validator');
const objectId = require('mongodb').ObjectId;

router.post('/',
[
	check('topic').isLength({min : 3}),
	check('thread').isLength({min : 3}),
	check('category').isLength({min : 1}),
],
async (req, res, next)=>{

	const errors = validationResult(req);

	if(!errors.isEmpty())
	{
		var errors_array = errors.array();
		res.status(401).json({errors_array});
	}
	else
	{

		nthread = {};
		nthread.topic = req.body.topic;
		nthread.user = req.session.threadToken;
		nthread.user_name = req.session.user;
		nthread.category = req.body.category;
		nthread.thread = req.body.thread;
		nthread.history = [{
			user : '',
			comment : '',
		}];


		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			if(error)
			{
				res.status(401).json({"msg" : "Internal Server Error"});
			}
			else
			{
				var db = client.db('forum');
				
				db.collection('thread').insertOne(nthread, (err, thread)=>{

					if(err)
					{
						res.status(401).json({"msg" : "Interal Server Error"});
					}
					else
					{
						console.log("TOKEN :",req.session.accessToken);
						db.collection('user').findOne({_id : new objectId(req.session.accessToken)}, (errorUser, user)=>{
							
							if(errorUser)
								res.status(401).json({"msg" : "Internal Server Error"});
	
							var nhistory;
							//user.thread.push(nthread);
							if(user.thread == undefined)
							{
								 nhistory = [nthread];
							}
							else
							{
								nhistory = user.thread;
								nhistory.push(nthread);
							}

							var query = {
								$set : {
									thread : nhistory
								}
							}

							db.collection('user').updateOne({_id : new objectId(req.session.accessToken)}, query, (errorUp, User)=>{
								if(errorUp)
									res.status(401).json({"msg" : "Internal Server Error"});
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

