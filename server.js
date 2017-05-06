/*================
https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli
==================
*/

// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const env = require("./.env/.env.js");


//Configuration
//mongoose.connect('mongodb://localhost/reminders');
mongoose.connect('mongodb://localhost/users');
var User = require("./models/user");


var FACEBOOK_APP_ID = env.facebookAppId;
var FACEBOOK_APP_SECRET = env.facebookAppSecret;

process.on('exit', function() { mongoose.disconnect() });
//EJS
app.set("view engine", "ejs");  // sets view engine to EJS
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
/*
//moved to server/routes/passport
//passport facebook strategy
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://45.55.156.114:3000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
      	console.log("existing user");
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving new user");
            done(null, user);
          }
        });
      }
    });
  }
));*/

// Point static path to /public
app.use(express.static(path.join(__dirname, 'public')));

// Get our API routes
const api = require('./server/routes/api');
const user = require('./server/routes/user');


// Set our api routes
app.use('/api', api);
app.use('/user', user);
var userController = require("./controllers/userController");

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/account',
  failureRedirect: '/error'
}));

app.get("/secret", ensureAuthenticated, userController.secret);

app.get('/success', function(req, res, next) {
	console.log("/success");
  	res.send('Successfully logged in.');
});

app.get('/account', ensureAuthenticated, function(req, res){
	console.log("/account");
	res.send(req.user + " is signed in.");
});

app.get('/error', function(req, res, next) {
	console.log("/error");
	res.send("Error logging in.");
});

app.get('/logout', function(req, res){
	console.log("/logout");
	req.logout();
	res.redirect('/');
});

//-------------

// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});*/

// test authentication
function ensureAuthenticated(req, res, next) {
	  //console.log(req);
	  if (req.isAuthenticated()) { return next(); }
	  console.log("auth failed, going to /");
	  res.redirect('/');
}
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


