// requiring mongoose dependency
var mongoose = require('mongoose');
var Band = require('./band.js');
// defining schema for reminders
var EventSchema = new mongoose.Schema({
	eventId: String,
	eventName: String,
	eventOwner: String,
	eventPlace: String,
	eventCategory: String,
	eventDescription: String,
	eventTime: {
		eventHour: String,
		eventDay: String,
		eventYear: String,
		eventMonth: String
	},
	eventCancelled: Boolean,
	eventVenue: String,
	social: [{
		name: String,
		picture: String,
		fbId: String
	}],
	bcEmbeds: [String],
	scEmbeds: [String],
	bands: [Band.schema]
});
// define the model
var Event = mongoose.model("Event", EventSchema);
// export the model to any files that `require` this one
module.exports = Event;