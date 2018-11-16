var Account = require('./signinPageModel');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req,res,next, id) {
  Account.findById(id)
    .select('-password')
    .exec()
    .then(function(account) {
      if(!account) {
        next(new Error('There is no Account with that ID'));
      } else {
        /* just passed this acount into the req */
        req.account = account;
        next();
      }
    }, function(err){
      next(err);
    });
};

exports.post = function(req,res,next){
  var newAccount = new Account(req.body);

  newAccount.save(function(err, account){
    if(err){
      return next(err);
    }
    var token = signToken(account._id);
    res.json({
      token: token
    });
  });
};
