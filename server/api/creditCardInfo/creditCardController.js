var CreditCard = require('./creditCardModel');
var ShippingAddress = require('./shippingAddressModel');
var config = require('../../../config');
var user = require('../user/userModel');

exports.postNewCreditCard = function(req,res,next){
var newCreditCard = new CreditCard(req.body);

user.findOne({'logininformation.username': config.username})
      .then(function(user) {
        if (!user) {
          console.log('No user with the given user id');
        } else {
          user.paymentinformation.push(newCreditCard);
          user.save();
        }
      }, function(err) {
        next(err);
      });

};

exports.postNewShippingAddress = function(req,res,next){
var newShippingAddress = new ShippingAddress(req.body);

user.findOne({'logininformation.username': config.username})
      .then(function(user) {
        if (!user) {
          console.log('No user with the given user id');
        } else {
          user.shippinginformation.push(newShippingAddress);
          user.save();
        }
      }, function(err) {
        next(err);
      });
      
};
