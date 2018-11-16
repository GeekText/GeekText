import express from 'express';
import apiRouter from './api';
import authRouter from './auth/routes';
import config from '../config';

const server = express();

// Trying to connect to mongodb with mongoose
var mongoose = require('mongoose');
mongoose.connect(config.mongodbUri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Use EJS to server render our javascript front end components*/
server.set('view engine', 'ejs');

// Application Middleware
require('./middleware/appMiddleware')(server);
/* Side note -- We should manage static assets separately from the node server,
we could use instead NGINX

This is express static middleware that we can use to automatically serve
static assets. This means any file found inside the public folder. Also it will
server the index.html on the root of that directory on a GET to '/'

- server.use() is just a way for us to register middleware on an application
level, because this object right here, server, is our web application.

- This is considered application-wide middleware*/
server.use(express.static('public'));

/* This is using our index.js file inside the api folder */
server.use('/', apiRouter);
server.use('/auth', authRouter);

/* Instead of listening to a single request event, an express server also
handles server side routing for us. */
server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});
