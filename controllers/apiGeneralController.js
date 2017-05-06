//var Reminder = require("../models/reminder");

var generalApiController = {
  index: function(req, res) {
  	res.send("api/index");
    // Reminder.find({}, function(err, docs) {
    //   res.render("api/index", {reminders: docs});
    // });
  }
};

module.exports = generalApiController;