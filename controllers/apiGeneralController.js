var Event = require("../models/event");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/events');

var generalApiController = {

  getEvents: function(req, res) {
  	//get events from db
  	Event.find({}, function(err, docs) {
  		res.json(docs);
  	});
  }
};

module.exports = generalApiController;