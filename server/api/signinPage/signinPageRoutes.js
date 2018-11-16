import express from 'express';
const router = express.Router();

router.get('/', function(req,res) {
  res.render('index', {
    content: 'Loading Account Page'
  });
});

// router.get('/',function(req,res){
//
// });

export default router;

/******** NOTES ON HOW ROUTES SHOULD WORK *************
  - To each endpoint you should pass in a controller
  as the sceond paramater in an express call.

  - Then each controller function will query the Database
  and then have another callback function where is has
  errors or results as the paramaters. check if there was
  an error if not then send back a res.render();

  - How express works is that the routing methods specify
  a callback function called when the application receives
  a request to the specified route (endpoint) and HTTP
  method. In other words, the application "listens" for
  request that match the specified route(s) and method(s),
  and when it detects a match, it calls the specified
  callback function.
  ******************************************************/

// import {MongoClient} from 'mongodb';
// import assert from 'assert';
// import config from '../../../config';


// let mdb;
// // Use connect method to connect to the server
// MongoClient.connect(config.mongodbUri,
//   {useNewUrlParser: true },
//   function(err, db) {
//     assert.equal(null, err);
//     console.log('Connected successfully to server');
//     mdb = db.db('accounts');
//   });

// // Database Name
// const dbName = 'geekBookStoreDB';
//
// // Use connect method to connect to the server
// MongoClient.connect(config.mongodbUri, function(err, client) {
//   assert.equal(null, err);
//   console.log('Connected successfully to server');
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//     client.close();
//   });
// });

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('accounts');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log('Found the following records');
//     console.log(docs);
//     callback(docs);
//   });
// };
