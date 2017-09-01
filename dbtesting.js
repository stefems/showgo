const mongoose = require('mongoose');
var User = require("./models/user");
var Event = require("./models/event");
var Band = require("./models/band");

mongoose.connect('mongodb://localhost/events');

let venueFilter = ['Hi-Dive Denver', 'Globe Hall', 'Larimer Lounge'];// 'Lost Lake', "Marquis Theatre", "Gothic Theatre", "The Fillmore", "Summit Music Hall", "Nocturne", "Dazzle", "The Ogden", "Bluebird", '3 Kings', "Lion's Lair"];
