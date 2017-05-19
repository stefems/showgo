var Event = require("../models/event");
var User = require("../models/user");

var request = require("request");
var mongoose = require('mongoose');


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
    mongoose.connect('mongodb://localhost/users');
    //---------------------------------------------------------------------
    //get the access_token from the user's db record using the params
    //---------------------------------------------------------------------
    User.findOne({ _id: userId }, function(err, user) {
      if(err) {
        mongoose.connection.close();
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
                mongoose.connection.close();
                console.log(error);
                res.json({error: "facebook event action request error"});
              }
              else {
                //search for the event in the events array
                User.findOne({ "_id": userId, "events.eventId": eventId}, function(err, userFound) {
                  if(err) {
                    mongoose.connection.close();
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
                          mongoose.connection.close();
                          console.log(err);  // handle errors!
                          res.json({error: "user event update error"});
                        }
                        else {
                          mongoose.connection.close();
                          console.log("saved user's events");
                          res.json({status: "true"});
                        }
                      });
                    }
                    else {
                      mongoose.connection.close();
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
                        mongoose.connection.close();
                        console.log(err);  // handle errors!
                        res.json({error: "user event creations error"});
                      }
                      else {
                        mongoose.connection.close();
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
        mongoose.connection.close();
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
    mongoose.connect('mongodb://localhost/events');
  	//get events from db
  	Event.find({}, function(err, docs) {
  		res.json(docs);
  	});
    mongoose.connection.close();
  },
  friendPost: function(req, res) {
    mongoose.connect('mongodb://localhost/users');
    //get the access_token and friend id from params
    let access_token = req.params.access_token;
    let friendId = req.params.friendId;
    //find mongo user
    User.findOne({access_token: access_token}, function(err, user) {
      if(err) {
        mongoose.connection.close();
        res.json({"error": "mongo error on friend add user find"});
      }
      else if (!err && user !== null){
        user.friends.push(friendId);
        user.save(function(error) {
          if (!error) {
            mongoose.connection.close();
            res.json({status: true});
          }
          else {
            mongoose.connection.close();
            res.json({error: "mongo save failure"});
          }
        })
      }
      else {
        mongoose.connection.close();
        console.log("this user doesn't exist.");
        res.json({error: "user does not exist"});
      }
    });
  }
  //SHOULD THESE BE DELETED
  // postJoin: function(req, res) {
  //   mongoose.connect('mongodb://localhost/users');
  //   //get the access_token from the user's db record using the params
  //   User.findOne({ _id: req.params.user_id }, function(err, user) {
  //     if(err) {
  //       mongoose.connection.close();
  //       console.log(err);  // handle errors!
  //     }
  //     if (!err && user !== null) {
  //         let access_token = user.access_token; 
  //         let facebookJoinEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
  //         "/attending?access_token=" + access_token;
  //         request.post({
  //           headers: {'content-type' : 'application/x-www-form-urlencoded'},
  //           url:     facebookJoinEventUrl
  //         }, function (error, response, body) {
  //             if (error) {
  //               mongoose.connection.close();
  //               console.log(error);
  //               res.json({error: "facebook join request error"});
  //             }
  //             else {
  //               //look through the users shows going list
  //               if (user.shows_going.indexOf(req.params.eventId) === -1){
  //                 user.shows_going.push(req.params.eventId);
  //                 user.save(function(err) {
  //                   if(err) {
  //                     mongoose.connection.close();
  //                     console.log(err);  // handle errors!
  //                     res.json({error: "user save error"});
  //                   } else {
  //                     mongoose.connection.close();
  //                     console.log("saved user's shows_going by adding show: " + req.params.eventId);
  //                     res.json({status: "true"});
  //                   }
  //                 });
  //               }
  //               else {
  //                 mongoose.connection.close();
  //                 console.log("show already in user's show_going list.");
  //                 res.json({error: "show already in list"});
  //               }
  //             }
  //           });
  //     } else {
  //       mongoose.connection.close();
  //       console.log("this user doesn't exist.");
  //       res.json({error: "user does not exist"});
  //     }
  //   });
  // },
  // postDecline: function(req, res) {
  //   mongoose.connect('mongodb://localhost/users');
  //   //send request to fb w/: event id, user access_token
  //   var facebookDeclineEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
  //   "/declined?access_token=" + req.params.access_token;
  //   request.post({
  //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
  //     url:     facebookDeclineEventUrl
  //   }, function (error, response, body) {
  //       if (error) {
  //         console.log("error");
  //         res.json({error: ""});
  //       }
  //       else {
  //         res.json(JSON.parse(body));
  //       }
  //     });
  // },
  // postInterested: function(req, res) {
  //   mongoose.connect('mongodb://localhost/users');
  //   //send request to fb w/: event id, user access_token
  //   var facebookInterestedEventUrl = "https://graph.facebook.com/" + req.params.eventId + 
  //   "/maybe?access_token=" + req.params.access_token;
  //   request.post({
  //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
  //     url:     facebookInterestedEventUrl
  //   }, function (error, response, body) {
  //       if (error) {
  //         console.log("error");
  //         res.json({error: ""});
  //       }
  //       else {
  //         res.json(JSON.parse(body));
  //       }
  //     });
  // }
};

module.exports = generalApiController;