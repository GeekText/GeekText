var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShippingAddressSchema = new Schema({
  address:{type:String},
  address2:{type:String},
  city:{type:String},
  statein:{type:String},
  zip:{type:String}
});

module.exports = mongoose.model('shippingAddresses', ShippingAddressSchema);