const mongoose = require('mongoose');
var User = require("./../models/user");

var passport = require("passport");
// var env = require("./../.env/.env.js");
var request = require("request");

var userController = {
  /*
  1. tests the received fb access token again by sending to facebook
  2. On pass, find our user or make a new one. Send the user back as response data.
  Failure or error states will return {error: message}
  */
  getUser: function(req, res) {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/users');
    console.log("getUser() in controller");
    //==================================================================
    //PART 1
    //==================================================================
    //get the two vals from the params
    var fbId = req.params.fbId;
    var access_token = req.params.access_token;
    //get the two app vals from env
    let appId = process.env.facebookAppId;
    let appSecret = process.env.facebookAppSecret;
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
            mongoose.connection.close();
            res.json({"error":"error"});
          }
          if (!err && user !== null) {
            console.log("existing user found.");
            //update user's access token
            user.access_token = access_token;
            user.save(function(err) {
              if(err) {
                mongoose.connection.close();
                console.log("mongo save error");
                console.log(err);  // handle errors!
                res.json({"error":"error"});
              } else {
                mongoose.connection.close();
                console.log("updating existing user's access token");
                res.json(user);
              }
            });
          } else {
            console.log("new user found.");
            user = new User({
              //todo: remove the oauthid user field
              oauthID: 0,
              id: fbId,
              name: JSON.parse(body).name,
              created: Date.now(),
              access_token: access_token,
              friends: [],
              venue_pages: [],
              events: []
            });
            user.save(function(err) {
              if(err) {
                mongoose.connection.close();
                console.log("mongo new user save error");
                console.log(err);  // handle errors!
                res.json({"error":"error"});
              } else {
                mongoose.connection.close();
                console.log("saving new user");
                res.json(user);
              }
            });
          }
        });
      }
      else {
        mongoose.connection.close();
        console.log("access token is invalid");
        res.json({"error": "invalid"});
      }
    });
  }
};

module.exports = userController;

// GET /signup
// POST /signup
// GET /login
// POST /login
// GET /logout
// Restricted page