var senderid;

module.exports = {

  create : function(req, res, next) {

    Request.create(req.params.all(), function requestCreated(err, request) {

      if (err) {
        //console.log(err);
        req.session.flash = {
          err: err
        };
        console.log(err);

        if (err) {
          return res.status(200).json({
            success: true,
            message: "Already send request"
          })
        }

      }
      //SendRequest.sendRequestMail(request);
        User.findOne({
          id: request.sender
        }, function foundUser(err, user) {
        if(!user){


        }
        request.name = user.name;
        request.email = user.email;
        request.phoneno = user.phone;
        request.date = user.date;
        request.time = user.time;

        request.save(function(err){
          if (err) {
            return res.status(200).json({
              success: true,
              message: "Cannot create request.Please try again"
            })
          }
          return res.redirect('/request/message' );

        });

        });


    });
  },

  'message' : function (req, res) {
    return res.status(200).json({
      message : "Successfully send message"
    })
  },



  send: function(req, res, next) {
    console.log(req.param('id'));

    Request.findOne(req.param('id'), function foundRequest(err, request) {
      if (err) return next(err);
      console.log(request);
      if (!request) return next();
      res.view({
        request: request

      });
    });
  },


  showrequest : function(req, res, next){
    var bool = false;
    var requestArray = [];

    User.findOne({
        id: req.header('id')
      }, function foundUser(err, user) {
      if (!user) {
        return res.status(200).json({
          success: false,

          message: "Sorry,no user found."
        })
      }
      Request.find({
        reciever: user.id
      }, function foundQuiz(err, requests) {
        if (err) return next(err);
        if (requests.length > 0) {
          return res.status(200).json({
            requests: requests,
            success: true
          });
        }
        else {
          return res.status(400).json({
            message: "No request found",
            success: true,
          });
        }
      });
    });
  },

  accetpRequest : function (req, res, next) {

  },

  destroy_request: function(req, res, next) {
    Request.findOne(req.param('id'), function foundRequest(err, request) {

      if (err) return next(err);

      if(!request) return next('Request doesn\'t exist ');

      Request.destroy(req.param('id'), function requestDestroyed(err){
        if(err) return next(err);
      });

      res.redirect('/request/showrequest');


    });

  }

};


