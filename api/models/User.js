
module.exports = {
  schema : true,

  attributes: {

    uid: 'STRING',

    name : {
      type : 'string',
      required : true
    },

    email : {
      type: 'string',
      email : true,
      required: true,
      unique : true
    },

    phone : {
      type : 'integer'
    },

    date : {
      type : 'string'
    },

    time : {
      type  : 'string'
    },

    token : {
      type : 'string'
    },

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    if (!values.password || values.password != values.confirmation) {
      return next({passworderror: ["Password doesn't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

