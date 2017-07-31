// requiring mongoose dependency
var mongoose = require('mongoose');
// defining schema for bands
var BandSchema = new mongoose.Schema({
	fbId: String,
	bcUrl: String
});
// define the model
var Band = mongoose.model("Band", BandSchema);
// export the model to any files that `require` this one
module.exports = Band;