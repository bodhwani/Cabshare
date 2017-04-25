

var err1;

module.exports = {

  attributes: {

    sender : {
      type : 'string',
      required : true
    },

    reciever : {
      type : 'string',
      required  : true
    },

    name : {
      type : 'string',
    },

    email : {
      type: 'string',
      email : true,
    },

    phone : {
      type : 'integer'
    },

    date : {
      type : 'string'
    },

    time : {
      type  : 'string'
    }

  },

  beforeCreate: function (values, next) {
    console.log("Values are");
    console.log(values);

    if(values.sender === values.reciever){
      err = true;
      return next(err);
    }
    User.findOne({
      token : values.token
    }, function foundUser(err, user) {
      console.log(user);
      Request.find({
        sender : values.sender
      }, function foundQuiz(err, requests) {
        console.log("request is ");
        console.log(requests);
        console.log("before create in quiz");

        requests.forEach(function (request) {
          if (request) {
            if(request.reciever === values.reciever){
              err = true;
            }
          }

        });
        if(err){
          return next(err);
        }
        else{
          next();
        }


      });
    });
  }


  // beforeCreate: function(values, next){
  //   console.log("Entered into beforeCreate funciton");
  //   Request.findOne({ where: { name: values.name}}).exec(function(err, found) {
  //     if(found == undefined){
  //       console.log("NOT FOUND"); //create the record
  //       next();
  //     }
  //     else{
  //       console.log("FOUND"); //don't create the record
  //       err1 = 1;
  //     }
  //
  //   });
  // }


};

