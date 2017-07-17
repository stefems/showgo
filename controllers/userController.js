const mongoose = require('mongoose');
var User = require("./../models/user");
var fs = require('fs');
var passport = require("passport");
var env;
if (fs.existsSync("../.env/.env.js")) {
  env = require("../.env/.env.js");
}
else {
  env = {
    facebookAppId: process.env.facebookAppId,
    facebookAppSecret: process.env.facebookAppSecret,
    googleKey: process.env.googleKey,
    googleId: process.env.googleId,
    soundcloudSecret: process.env.soundcloudSecret
  };
}
var request = require("request");
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events');


var userController = {
  getId: function(req, res) {
    var access_token = req.params.access_token;
    let url = "https://graph.facebook.com/me?access_token="+access_token;
    request(url, function (error, response, body) { 
      if (!error && JSON.parse(body).name && JSON.parse(body).id) {
        res.json({id: JSON.parse(body).id});
      }
      else {
        console.log("failed to acquire id from access token");
        res.json({"error":"error"});
      }
    });
  },
  /*
  1. tests the received fb access token again by sending to facebook
  2. On pass, find our user or make a new one. Send the user back as response data.
  Failure or error states will return {error: message}
  */
  getUser: function(req, res) {
    console.log("getUser() in controller");
    //==================================================================
    //PART 1
    //==================================================================
    //get the two vals from the params
    var fbId = req.params.fbId;
    var access_token = req.params.access_token;
    //get the two app vals from env
    let appId = env.facebookAppId;
    let appSecret = env.facebookAppSecret;
    let url = "https://graph.facebook.com/me?access_token="+access_token;
    //send the request to fb graph
    request(url, function (error, response, body) {      
      //==================================================================
      //PART 2
      //==================================================================
      if (!error && JSON.parse(body).name && JSON.parse(body).id === fbId) {
        //get the user from our db that matches
        console.log("get name request was true");
        console.log(fbId);
        User.findOne({ "id": fbId }, function(err, user) {
          if(err) {
            console.log("mongo find error");
            console.log(err);  // handle errors!
            res.json({"error":"error"});
          }
          else if (!err && user !== null) {
            console.log("existing user found.");
            //update user's access token
            user.access_token = access_token;
            user.save(function(err) {
              if(err) {
                console.log("mongo save error");
                console.log(err);  // handle errors!
                res.json({"error":"error"});
              } else {
                console.log("updating existing user's access token");
                //updating their profile photo
                request("https://graph.facebook.com/" + user.id + "/picture?redirect=0", function(err, r, bod){
                  if (!err && JSON.parse(bod).data && JSON.parse(bod).data.url) {
                    var pictureUrl = JSON.parse(bod).data.url;
                    //find in array
                    user.picture = pictureUrl;
                    request("https://graph.facebook.com/" + fbId + "/friends?access_token=" + access_token, function(error, r, body){
                      //if not error or null
                      if (!error) {
                        //get each id, perform lookup for user
                        let friendList = JSON.parse(body).data;
                        console.log(friendList.length);
                        let duplicate = false;
                        for (let friend = 0; friend < friendList.length; friend++) {
                          for (let i = 0; i < user.friends.length; i++) {
                            if (friendList[friend].id === user.friends[i].fbId ) {
                              duplicate = true;
                              break;
                            }
                          }
                          if (duplicate) {
                            break;
                          }
                          duplicate = false;
                          for (let i = 0; i < user.friendSuggestions.length; i++) {
                            if (friendList[friend].id === user.friendSuggestions[i].fbId ) {
                              duplicate = true;
                              break;
                            }
                          }
                          if (!duplicate) {
                            let newFriendSuggestion = {
                              name: "",
                              picture: "",
                              fbId: friendList[friend].id
                            };
                            user.friendSuggestions.push(newFriendSuggestion);
                            //incrememt the friend suggestions notifications
                            user.friendNotifications++;
                          }
                          else {

                          }
                        }
                        user.save(function(err) {
                          if(err) {
                            console.log("mongo save error");
                            console.log(err);  // handle errors!
                            res.json({"error":"error"});
                          } 
                          else {
                            console.log("updated user's friend suggestions and notifications");
                            res.json(user);
                          }
                        });
                      }
                    });
                  }
                  // res.json(user);
                });
              }
            });
          }
          else {
            console.log("new user found.");
            request("https://graph.facebook.com/" + fbId + "/picture?redirect=0", function(err, r, bod){
              if (!err && JSON.parse(bod).data && JSON.parse(bod).data.url) {
                user = new User({
                  //todo: remove the oauthid user field
                  oauthID: 0,
                  id: fbId,
                  name: JSON.parse(body).name,
                  created: Date.now(),
                  access_token: access_token,
                  friends: [],
                  venue_pages: [],
                  events: [],
                  picture: "",
                  friendNotifications: 0,
                  inviteNotifications: 0,
                  eventInvites: [],
                  friendSuggestions: [],
                  invitesSent: []
                });
                var pictureUrl = JSON.parse(bod).data.url;
                user.picture = pictureUrl;                
                user.save(function(err) {
                  if(err) {
                    console.log("mongo new user save error");
                    console.log(err);  // handle errors!
                    res.json({"error":"error"});
                  } else {
                    //send request to find friends
                    console.log("saving new user");
                    //send request to get friends
                    request("https://graph.facebook.com/" + fbId + "/friends?access_token=" + access_token, function(error, r, body){
                      //if not error or null
                      if (!error) {
                        //get each id, perform lookup for user
                        let friendList = JSON.parse(body).data;
                        let duplicate = false;
                        for (let friend = 0; friend < friendList.length; friend++) {
                          for (let i = 0; i < user.friends.length; i++) {
                            if (friendList[friend].id === user.friends[i].fbId ) {
                              duplicate = true;
                              break;
                            }
                          }
                          if (duplicate) {
                            break;
                          }
                          duplicate = false;
                          for (let i = 0; i < user.friendSuggestions.length; i++) {
                            if (friendList[friend].id === user.friendSuggestions[i].fbId ) {
                              duplicate = true;
                              break;
                            }
                          }
                          if (!duplicate) {
                            let newFriendSuggestion = {
                              name: "",
                              picture: "",
                              fbId: friendList[friend].id
                            };
                            user.friendSuggestions.push(newFriendSuggestion);
                            //incrememt the friend suggestions notifications
                            user.friendNotifications++;
                          }
                        }
                        user.save(function(err) {
                          if(err) {
                            console.log("mongo save error");
                            console.log(err);  // handle errors!
                            res.json({"error":"error"});
                          } 
                          else {
                            console.log("updated user's friend suggestions and notifications");
                            res.json(user);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      else {
        console.log(error);
        console.log(JSON.parse(body));
        console.log(JSON.parse(body).id + ", " + fbId);
        console.log("id match: " + JSON.parse(body).id == fbId);
        console.log("access token is invalid");
        res.json({"error": "invalid"});
      }
    });
  }
};

function findPhotoAndName(user, friend) {

  //send request to get photo
  request("https://graph.facebook.com/" + friend.fbId + "/picture?redirect=0", function(error, response, body){
    if (!err && JSON.parse(body).data && JSON.parse(body).data.url) {
      friend.picture = JSON.parse(body).data.url;
    }
    //send request to get name
    request("https://graph.facebook.com/" + friend.fbId + "?access_token="+user.access_token, function(error, response, body){
      if (!err) {
        friend.name = JSON.parse(body).name;
      }
    });
  });


  //save to friend object


}

module.exports = userController;

// GET /signup
// POST /signup
// GET /login
// POST /login
// GET /logout
// Restricted page