var User = require("../models/user");
var passport = require("passport");

var userController = {
  index: function(req, res) {
  	res.send("/user/index");
    // Reminder.find({}, function(err, docs) {
    //   res.render("api/index", {reminders: docs});
    // });
  },
  secret: function(request, response, next) {
  	console.log("/secret");
  	response.json({secret: "Woooah secret!"});
  }
};

module.exports = userController;

// GET /signup
// POST /signup
// GET /login
// POST /login
// GET /logout
// Restricted page