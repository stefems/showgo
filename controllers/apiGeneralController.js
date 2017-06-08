var Event = require("../models/event");
var User = require("../models/user");

var request = require("request");
var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events');


function findEvent(events, eventId) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].eventId === eventId) {
      return events[i];
    } 
  }
  return null;
}

var generalApiController = {

  //will need a function for sending post request for any kind of event
  //req params will choose the event type, and then also there's the event id
  eventPost: function(req, res) {
    //get all the req params!
    let actionType = req.params.actionType;
    let eventId = req.params.eventId;
    let userId = req.params.userId;
    console.log(actionType + " eventId: " + eventId + " user: " + userId);
    //---------------------------------------------------------------------
    //get the access_token from the user's db record using the params
    //---------------------------------------------------------------------
    User.findOne({ _id: userId }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
        res.json({error: "mongoose connection error"});
      }
      if (!err && user !== null) {
          let access_token = user.access_token;
          let facebookJoinEventUrl = "";
          switch (actionType) {
            case "interested":
              facebookJoinEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
              "/maybe?access_token=" + access_token;
              break;
            case "join":
              facebookJoinEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
              "/attending?access_token=" + access_token;
              break;
            case "ignore":
              facebookJoinEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
              "/declined?access_token=" + access_token;
              break;
          }
          //---------------------------------------------------------------------
          //use the access token to send a request to facebook for the event change
          //---------------------------------------------------------------------
          request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     facebookJoinEventUrl
          }, function (error, response, body) {
              if (error) {
                console.log(error);
                res.json({error: "facebook event action request error"});
              }
              else {
                //search for the event in the events array
                User.findOne({ "_id": userId, "events.eventId": eventId}, function(err, userFound) {
                  if(err) {
                    console.log(err);  // handle errors!
                    res.json({error: "mongoose connection error"});
                  }
                  //event is already in user's events list, let's change the action type on the event
                  if (!err && userFound !== null) {
                    //find the event from the events array
                    let eventToChange = findEvent(userFound.events, eventId);
                    if (eventToChange) {
                      //---------------------------------------------------------------------
                      //updating the event information for the user
                      //---------------------------------------------------------------------
                      eventToChange.actionType = actionType;
                      userFound.save(function(err) {
                        if(err) {
                          console.log(err);  // handle errors!
                          res.json({error: "user event update error"});
                        }
                        else {
                          console.log("saved user's events");
                          res.json({status: "true"});
                        }
                      });
                    }
                    else {
                      console.log("event not found");
                      res.json({error: "user event save error"});
                    }
                  }
                  //event is not in user's list. Let's create that object and add it.
                  else {
                    let newEvent = {
                      "eventId": eventId, "actionType": actionType
                    };
                    user.events.push(newEvent);
                    //---------------------------------------------------------------------
                    //adding the event information for the user
                    //---------------------------------------------------------------------
                    user.save(function(err) {
                      if(err) {
                        console.log(err);  // handle errors!
                        res.json({error: "user event creations error"});
                      }
                      else {
                        console.log("saved user's events");
                        res.json({status: "true"});
                      }
                    });
                  }
                });
              }
            });
      } 
      else {
        console.log("this user doesn't exist.");
        res.json({error: "user does not exist"});
      }
    });
  },
  //TODO: not needed?
  eventDelete: function(req, res) {
    //get all the req params!
  },
  //will need a function for sending delete request for any kind of event (because they can't have an event in multiple categories)
  getEvents: function(req, res) {
    // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events');
  	//get events from db
  	Event.find({}, function(err, docs) {
  		res.json(docs);
  	});
  },
  friendPost: function(req, res) {
    //get the access_token and friend id from params
    let access_token = req.params.access_token;
    let friendId = req.params.friendId;
    //find mongo user
    User.findOne({access_token: access_token}, function(err, user) {
      if(err) {
        res.json({"error": "mongo error on friend add user find"});
      }
      else if (!err && user !== null){
        if (user.friends.indexOf(friendId) === -1) {
          user.friends.push(friendId);
          user.save(function(error) {
            if (!error) {
              res.json({"status": true});
            }
            else {
              res.json({"error": "mongo save failure"});
            }
          });
        }
        else {
          res.json({"error": "friend already in list"});
        }
      }
      else {
        console.log("this user doesn't exist.");
        res.json({"error": "user does not exist"});
      }
    });
  }
};

module.exports = generalApiController;