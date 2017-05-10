var Event = require("../models/event");
var User = require("../models/user");

var request = require("request");
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/users');
mongoose.createConnection('mongodb://localhost/events');

var generalApiController = {

  getEvents: function(req, res) {
  	//get events from db
  	Event.find({}, function(err, docs) {
  		res.json(docs);
  	});
  },
  postJoin: function(req, res) {
    //get the access_token from the user's db record using the params
    User.findOne({ _id: req.params.user_id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
          let access_token = user.access_token; 
          let facebookJoinEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
          "/attending?access_token=" + access_token;
          request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     facebookJoinEventUrl
          }, function (error, response, body) {
              if (error) {
                console.log(error);
                res.json({error: ""});
              }
              else {
                //look through the users shows going list
                if (user.shows_going.indexOf(req.params.eventId) === -1){
                  user.shows_going.push(req.params.eventId);
                  user.save(function(err) {
                    if(err) {
                      console.log(err);  // handle errors!
                    } else {
                      console.log("saved user's shows_going by adding show: " + req.params.eventId);
                    }
                  });
                }
                else {
                  console.log("show already in user's show_going list.");
                }
              }
            });
      } else {
        console.log("this user doesn't exist.");
      }
    });
  },
  postDecline: function(req, res) {
    //send request to fb w/: event id, user access_token
    var facebookDeclineEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
    "/declined?access_token=" + req.params.access_token;
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     facebookDeclineEventUrl
    }, function (error, response, body) {
        if (error) {
          console.log("error");
          res.json({error: ""});
        }
        else {
          res.json(JSON.parse(body));
        }
      });

  },
  postInterested: function(req, res) {
    //send request to fb w/: event id, user access_token
    var facebookInterestedEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
    "/maybe?access_token=" + req.params.access_token;
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     facebookInterestedEventUrl
    }, function (error, response, body) {
        if (error) {
          console.log("error");
          res.json({error: ""});
        }
        else {
          res.json(JSON.parse(body));
        }
      });

  }
};

module.exports = generalApiController;