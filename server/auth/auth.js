var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../api/signinPage/signinPageModel');
var crypto = require('crypto'); 
var expressJwt = require('express-jwt');
// var checkToken = expressJwt({ secret: config.secrets.jwt });


exports.verifyUser = function() {
  return function(req, res, next) {
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
            req.user = user;
            var token = signToken(req.user._id);
            res.json({token: token});
            next();
          }
          }
      }, function(err) {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  //jwt.sign(payload,secretOrPrivateKey,[options,Callbacks])
  // create it the jsonwebtoken with the min but that its long
  // enough to be secure.
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};
