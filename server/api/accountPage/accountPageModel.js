var mongoose = require('moongose');
var Schema = mongoose.Schema;

var AccountPageSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },

  username:{
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true
  },

  name:{
    firstname:{
      type: String,
      required: true
    },
    lastname:{
      type: String,
      required: true
    }
  },

  address:{
    street:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    },
    zipcode:{
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('account', AccountPageSchema);
