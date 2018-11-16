var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SignInSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true
  }
});

SignInSchema.pre('save', function(next){
  if(!this.isModifed('password')){
    return next();
  }

  this.password = this.encryptPassword(this.password);
  next();
});

SignInSchema.methods = {
  // This is a synchronous way of hasing the password
  encryptPassword: function(plainTextPassword){
    if(!plainTextPassword){
      return '';
    } else {
      var salt = bcrypt.genSaltSync(10);
      /*  Instead of storing the hash password in a variable just return the
          hash password directly */
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  },

  /* Check whether the password that was passed is correct to the one saved in
   the database. */
  authenticate: function(plainTextPassword){
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
};


/*  NOTES

    The first argument is the singular name of the collection your model is for.
    So this would be for the collection named accounts in the databse

    The second argument is the name of how your schema. The schema defines the
    shape of the documents within that collection. */
module.exports = mongoose.model('account', SignInSchema);
