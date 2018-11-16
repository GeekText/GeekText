var _ = require('lodash');
var crypto = require('crypto');
var rand = require('csprng');
var jwt = require('jsonwebtoken');
var config = require('../../../config');
var User = require('../../api/signinPage/signinPageModel');


// Doing this so that we can update LoginInformation
var User = require('./userModel');
// IF USER FOUND BY ID THEN ATTACH HIM/HER TO [ req.user ]
exports.params = function(req,res,next,id){
  User.findById(config.usersObjectId)
    .then(function (user){
      if (!user){
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err){
      next(err);
    });
};

// POST REQUEST TO CREATE A NEW USER IN THE DATABASE
/*-----------------------------------------------------------------------
 | This route is being used by [ http://localhost:8080/auth/createaccount ]
 | in the create user tab.
 -----------------------------------------------------------------------*/
exports.post_NewCreateAccountUSER = function(req,res,next){
  var temp = rand(160, 36);
  var newpass = temp + req.body.password;
  var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

  var newUser = new User({
    logininformation: {
      username: req.body.username,
      password: hashed_password,
      salt: temp
    },
    personalinformation: {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }
  });
  newUser.save(function(err){
    if(err){return next(err);}
    // console.log('password: ' + password + '\n');
    console.log('User added to the database');
  });
};


// util method to sign tokens on signup
let signToken = function(id) {
  //jwt.sign(payload,secretOrPrivateKey,[options,Callbacks])
  // create it the jsonwebtoken with the min but that its long
  // enough to be secure.
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};

exports.login = function(req,res,next){
  // return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then send
    if (!username || !password) {
      console.log('You need a username and password');
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({'logininformation.username': username})
      .then(function(user) {
        if (!user) {
          res.status(401).send('No user with the given username');
          console.log('No user with the given username: ' + username);
        } else {
          // checking the passowords here
          var temp = user.logininformation.salt; 
          var newpass = temp + password; 
          var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

          if (user.logininformation.password != hashed_password) {
            console.log('Wrong password... :(');
          } else {
            // if everything is good,
            // then attach to req.user
            // and call next so the controller
            // can sign a token from the req.user._id
            console.log('Login Successful! ');
            // req.user = user;
            // var token = signToken(req.user._id);
            // res.json({token: token});
            config.usersObjectId = user._id;
            config.username = username;
            
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  // };
};

// GET A JSON RESPONSE WITH ALL THE DATA OF A USER
exports.get_UserData = function(req,res,next){
  var user = req.user.toJson();
  // console.log(user);
  res.json(user);
  next();
};

// PUT A RESPONSE WITH DATA BACK INTO THE DATABASE FOR THAT SPECIFIC USER.
exports.put_UserUpdate = function(req,res,next){
  var user = req.user;
  var update = req.body;
  console.log("Updating User Info... ");
  // req.body has [object Object] use the bottom to see what its returning
  // var update = JSON.stringify(req.body);
  // console.log('PUT UPDATE RESPONSE   ' + update);

  _.merge(user, update);

  user.save(function (err,saved){
    if(err){
      next(err);
    } else {
      res.json(saved.toJson());
    }
  });
};

