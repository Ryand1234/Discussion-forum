const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) =>{
	const authHeader = req.header['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) {
		req.status(501)
		next()
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
		if(err) {
			req.status(501)
			next()
		}

		req.user = user
		next()
	}) 

}

module.exports = authenticate