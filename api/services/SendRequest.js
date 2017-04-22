

module.exports.sendRequestMail = function(obj) {

  console.log(obj);
  sails.hooks.email.send(
    "sendingMail",
    {
      Name : obj.name

    },
    {
      to: "vinitbodhwani123@gmail.com",
      subject: "Invitation to Share a Cab"
    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("ACM MAil It worked!");
      }
    }
  )
};
