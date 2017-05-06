var Reminder = require("../models/reminder")

var remindersController = {
  index: function(req, res) {
    Reminder.find({}, function(err, docs) {
      res.render("reminders/index", {reminders: docs});
    });
  }
}

module.exports = remindersController;