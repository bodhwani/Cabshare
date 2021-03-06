module.exports = {


  'new' : function (req, res) {
     res.view();

  },





  create : function(req, res, next) {

    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        //console.log(err);
        req.session.flash = {
          err: err
        };
        return res.status(200).json(err);
      }

      req.session.authenticated = true;
      req.session.User = user;
      user.token = sailsTokenAuth.issueToken(user.id);
      user.save(function (err) {
        if(err){
          return res.state(200).json(err);
        }
        console.log("Saving user");
        res.json({
          user: user,
          token: sailsTokenAuth.issueToken(user.id)
        });
      });
    });
  },


  show: function(req, res, next) {
    User.findOne(req.header('token'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success : false,
          message : "No user found"
        });
      }


      return res.status(200).json({
        success : true,
        user : user
      })
    });
  },


  showall : function(req, res, next){

    User.find(function foundUsers(err, users){
      if(users.length > 0) {
        if (err) return next(err);
        return res.status(200).json({
          success: true,
          users: users
        });
      }
      else{
        return res.status(401).json({
          success: false,
          message : "No users found"
        });

      }
    });
  },

  send: function(req, res, next) {
    console.log(req.param('id'));

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },



  // // //this function is used for returning all the users in form of array.
  // //
  // edit : function(req, res, next){
  //   User.findOne(req.param('id'), function foundUser (err, user){
  //     //find the user by id
  //     if(err) return next(err);
  //     if(!user) return next();
  //
  //     res.view({
  //       user : user
  //     });
  //   });
  // },
  //
  // edit_password : function(req, res, next){
  //   User.findOne(req.param('id'), function foundUser (err, user){
  //     //find the user by id
  //     if(err) return next(err);
  //     if(!user) return next();
  //
  //     res.view({
  //       user : user
  //     });
  //   });
  // },
  //
  // update : function(req,res,next){
  //
  //
  //
  //   User.update(req.param('id'),req.params.all(), function userUpdated(err){
  //     if(err){
  //       return res.redirect('/user/edit/'+req.param('id'));
  //     }
  //     res.redirect('/user/show/'+req.param('id'));
  //   });
  // },
  //
  //
  // destroy: function(req, res, next) {
  //   User.findOne(req.session.User.id, function foundUser(err, user) {
  //
  //     if (err) return next(err);
  //
  //     if(!user) return next('User doesn\'t exist ');
  //
  //     User.destroy(req.param('id'), function userDestroyed(err){
  //       if(err) return next(err);
  //     });
  //
  //     res.redirect('/user/index');
  //
  //
  //   });
  //
  // }
};





