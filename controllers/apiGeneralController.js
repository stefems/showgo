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
    let access_token = req.params.access_token;
    let facebookJoinEventUrl = "";
    console.log(actionType + " eventId: " + eventId + " user: " + userId);
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
    //send the request. If it fails, we send failure, otherwise we'll update the user.
    request.post(
    {
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     facebookJoinEventUrl
    }, function (error, response, body) {
      console.log(JSON.parse(body));
      if (error || JSON.parse(body).success !== true) {
        res.json({error: "facebook event action request error"});
      }
      else {
        User.findOne({ _id: userId }, function(err, user) {
          if(err) {
            console.log(err);  // handle errors!
            res.json({error: "mongoose connection error"});
          }
          else if (!err && user !== null ) {
            let eventToChange = findEvent(user.events, eventId);
            //if we found an event (otherwise null)
            if (eventToChange) {
              //---------------------------------------------------------------------
              //updating the event information for the user
              //---------------------------------------------------------------------
              eventToChange.actionType = actionType;
              user.save(function(err) {
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
              //event is not in user's list. Let's create that object and add it.
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
          }
          //this user doesn't exist... wwwuuhh
          else {
            console.log("user " + userId + " does not exist in the db so the event action failed.");  // handle errors!
            res.json({error: "action type attempted for non-user"});
          }
        });
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
      let friendAlready = false;
      if(err) {
        res.json({"error": "mongo error on friend add user find"});
      }
      else if (!err && user !== null){
        for (let i = 0; i < user.friends.length; i++) {
          if (user.friends[i].fbId == friendId) {
            console.log("friend already in list");
            friendAlready = true;
          }
        }
        if (friendAlready) {
            res.json({"error": "friend already in list"});
        }
        else {
          //get their name and img
          let friend = req.body;
          user.friends.push(friend);
          user.save(function(error) {
            if (!error) {
              res.json({"status": true});
            }
            else {
              res.json({"error": "mongo save failure"});
            }
          });
        }
      }
      else {
        console.log("this user doesn't exist.");
        res.json({"error": "user does not exist"});
      }
    });
  },
  unfriendPost: function(req, res) {
    //get the access_token and friend id from params
    let access_token = req.params.access_token;
    let friendId = req.params.friendId;
    //find mongo user
    User.findOne({access_token: access_token}, function(err, user) {
      if(err) {
        res.json({"error": "mongo error on friend add user find"});
      }
      else if (!err && user !== null){
        let removed = false;
        for (let i = 0; i < user.friends.length; i++) {
          if (user.friends[i].fbId == friendId) {
            //get their name and img
            removed = true;
            user.friends.splice(i, 1);
            break;
          }
        }
        if (removed) {
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
          res.json({"status": "friend not in list"});
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