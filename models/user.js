// requiring mongoose dependency
var mongoose = require('mongoose');

// defining schema for reminders
var UserSchema = new mongoose.Schema({
  oauthID: Number,
  name: String,
  created: Date,
  access_token: String,
  friends: [String],
  events: [{
    eventId: String,
    actionType: String
  }],
  venue_pages: [String],
  id: String
});
// define the model
var User = mongoose.model("User", UserSchema);
// export the model to any files that `require` this one
module.exports = User;