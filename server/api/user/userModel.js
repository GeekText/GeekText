var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginInfoSchema = new Schema({
  username:{type:String, required: true, unique:true},
  password:{type:String, required: true},
  salt: String
});

var NicknameInfoSchema = new Schema({
  nickname:{type:String}
});


var PersonalInfoSchema = new Schema({
  firstname:{type:String, required: true},
  lastname:{type:String, required: true},
  email:{type:String},
  address:{type:String},
  address2:{type:String},
  city:{type:String},
  statein:{type:String},
  zip:{type:String}
});

var PaymentInfoSchema = new Schema({
  nameoncard: {type:String},
  cardnumber: {type:String},
  expirydate: {type:String},
  securitycode: {type:String}
});

var ShippingInfoSchema = new Schema({
  address:{type:String},
  address2:{type:String},
  city:{type:String},
  statein:{type:String},
  zip:{type:String}
});

var UserSchema = new Schema({
  logininformation: LoginInfoSchema,
  nicknameinformation: NicknameInfoSchema,
  personalinformation: PersonalInfoSchema,
  paymentinformation: [PaymentInfoSchema],
  shippinginformation: [ShippingInfoSchema]
});

UserSchema.methods = {
  toJson: function(){
    var obj = this.toObject();
    return obj;
  }
};

module.exports = mongoose.model('User', UserSchema);
