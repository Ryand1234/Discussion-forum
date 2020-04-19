const router = require('express').Router();
const mongo = require('mongodb');
const {check, validationResult} = require('express-validator');

router.post('/',
[
	check('topic').isLength({min : 3}),
	check('thread').isLength({min : 3}),
	check('category').isLength({min : 1}).isAlpha(),
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
		nthread.user = req.session.accessToken;
		nthread.user_name = req.session.user;
		nthread.categoty = req.body.category;
		nthread.id = Math.floor(Math.random()*50000000);
		nthread.thread = req.body.thread;
		nthread.history = {
			user : new Array(),
			comment : new Array(),
		};


		mongo.MongoClient.connect(process.env.MONGO_URL, (error, client)=>{
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
						res.status(200).json({"msg" : "Thread Made"});
					}
				});
			}
		});
	}
});

module.exports = router;

