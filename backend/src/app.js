const express = require('express');
const session = require('express-session');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var mongoose = require('mongoose');



const app = express();


app.use(express.json());
app.use(session({secret: 'helloforum', resave: true, saveUninitialized: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'helloWorld', resave:true, saveUninitialized: true}));



//Authentication Routes files
const registerRoute = require('./routes/authentication/register');
const loginRoute = require('./routes/authentication/login');
const profileRoute = require('./routes/authentication/profile');
const logoutRoute = require('./routes/authentication/logout');


//Public Profile
const pubProfileRoute = require('./routes/authentication/public_profile')


//Thread Routes files
const newThreadRoute = require('./routes/threads/new_thread');
const allThreadRoute = require('./routes/threads/show_all_thread');
const threadRoute = require('./routes/threads/single_thread');
const commentRoute = require('./routes/threads/comment');
const likeRoute = require('./routes/threads/like_thread');
const dislikeRoute = require('./routes/threads/dislike_thread');


//Search Routes files
const categoryRoute = require('./routes/search/thread_by_category');


//Authentication Routes
app.use('/user/register', registerRoute);
app.use('/user/login', loginRoute);
app.use('/user/profile', profileRoute);
app.use('/user/logout', logoutRoute);
app.use('/user/', pubProfileRoute);


//Thread Routes
app.use('/thread/new', newThreadRoute);
app.use('/thread/all', allThreadRoute);
app.use('/thread/', threadRoute);
app.use('/thread/comment', commentRoute);
app.use('/thread/like/', likeRoute);
app.use('/thread/dislike/', dislikeRoute)


//Search Routes
app.use('/search/', categoryRoute);


mongoose.connect("mongodb://localhost:5000/ecommerce",{ useUnifiedTopology: true, useNewUrlParser: true}, (err,db)=>{
	if(err){
		console.log("ERROR: ",err);
	}else{
		console.log("CONNECTED");
		console.log(db.readyState);
		db.close();
		}
	});

var db = mongoose.connection;

db.on('error.name', console.error.bind(console.name, 'Mongodb connection error'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Message: ",err.message);
  console.log("ERROR: ",res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//Server
app.listen(3000, () => console.log('Server Running on port 3000'));


