var _ = require('lodash');
var User = require('../user/userModel');
// var AccountPage = require('./accountPageModel');


exports.params = function(req,res,next,id){
  User.findById(id)
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
exports.displayAccountPage = function(req, res,next) {
  res.render('index', {
    content: 'Loading Account Page'
  });
  next();
};
exports.getUserData = function(req,res,next) {
  var user = req.user.toJson();
  res.json(user);
  next();
};
exports.updateUserLoginInfo = function(req,res,next){
  var user = req.user;
  var update = req.body;

  _.merge(user, update);

  user.save(function (err,saved){
    if(err){
      next(err);
    } else {
      res.json(saved.toJson());
    }
  });
};

/******************************** NOTES **************************************/
/* The form that we are doing is a variation or stylistic way of doing it
(Functional way of doing it instead of a Class based way of doing it). We
could have also used this form to export the methods.

module.exports = {
  params: function(){},
  get: function(){}
}
*/

// exports.params = function(req,res,next,id){
//   AccountPage.findById()
//     .then(function(){
//
//     });
// };
//
// exports.get = function (req,res,next){
//
// };
