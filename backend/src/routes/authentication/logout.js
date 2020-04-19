const router = require('express').Router();
const session = require('express-session');

router.use('/', (req, res, next)=>{
	
	req.session.destroy((err) => {
		
		if(err) {
			res.status(401).json({"msg" : "Error in Logout"});
		}
		res.status(200).json({"msg" : "Logout Sucessfull"});
	}

});

module.exports = router;
