// requiring mongoose dependency
var mongoose = require('mongoose');
var Event = require('./event.js');

// defining schema for reminders
var UserSchema = new mongoose.Schema({
  oauthID: Number,
  name: String,
  created: Date,
  access_token: String,
  friends: [{
    name: String,
    picture: String,
    fbId: String,
    isUser: Boolean
  }],
  events: [{
    eventId: String,
    actionType: String
  }],
  venue_pages: [{
    show: String,
    name: String
  }],
  genres: [String],
  id: String,
  picture: String,
  friendSuggestions: [{
    name: String,
    picture: String,
    fbId: String
  }],
  friendNotifications: Number,
  inviteNotifications: Number,
  eventInvites: [{
    invitedByNames: [String],
    event: String
  }],
  invitesSent: [{
    friendInvited: String,
    eventId: String
  }]

});
// define the model
var User = mongoose.model("User", UserSchema);
// export the model to any files that `require` this one
module.exports = User;