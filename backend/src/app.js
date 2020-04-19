const express = require('express');
const session = require('express-session');
require('dotenv').config();


const app = express();


app.use(express.json());
app.use(session({secret: 'helloforum', resave: true, saveUninitialized: true}));



//Authentication Routes files
const registerRoute = require('./routes/authentication/register');
const loginRoute = require('./routes/authentication/login');
const profileRoute = require('./routes/authentication/profile');
const logoutRoute = require('./routes/authentication/logout');


//Thread Routes files
const newThreadRoute = require('./routes/threads/new_thread');
const allThreadRoute = require('./routes/threads/show_all_thread');
const threadRoute = require('./routes/threads/single_thread');


//Search Routes files
const categoryRoute = require('./routes/search/thread_by_category');


//Authentication Routes
app.use('/user/register', registerRoute);
app.use('/user/login', loginRoute);
app.use('/user/profile', profileRoute);
app.use('/user/logout', logoutRoute);


//Thread Routes
app.use('/thread/new', newThreadRoute);
app.use('/thread/all', allThreadRoute);
app.use('/thread/', threadRoute);


//Search Routes
app.use('/search/', categoryRoute);


//Server
app.listen(3000, () => console.log('Server Running on port 3000'));
