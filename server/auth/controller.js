// var User = require('../api/signin/signInModel');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  console.log('Hellomeng');

  var token = signToken(req.user._id);
  res.json({token: token});
  // You added this next() so if something fails
  next();
};
