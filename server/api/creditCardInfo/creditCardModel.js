var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreditCardSchema = new Schema({
  nameoncard: {type: String},
  cardnumber: {type: String},
  expirydate: {type: String},
  securitycode: {type: String}
});

module.exports = mongoose.model('creditcards', CreditCardSchema);

