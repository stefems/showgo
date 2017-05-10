
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const http = require('http');

const env = require("./.env/.env.js");
const api = require('./server/routes/api');
var User = require("./models/user");
var Event = require("./models/event");
var user;
//-------------------------
passport.use(new FacebookStrategy({
    clientID: env.facebookAppId,
    clientSecret: env.facebookAppSecret,
    callbackURL: env.facebookCallbackUrl
    }, function(accessToken, refreshToken, profile, done) {
        //console.log(profile);
        User.findOne({ oauthID: profile.id }, function(err, user) {
              if(err) {
                console.log(err);  // handle errors!
              }
              if (!err && user !== null) {
                //update user's access token
                user.access_token = accessToken;
                user.save(function(err) {
                  if(err) {
                    console.log(err);  // handle errors!
                  } else {
                    console.log("updating existing user's access token");
                    done(null, user);
                  }
                });
              } else {
                user = new User({
                  oauthID: profile.id,
                  name: profile.displayName,
                  created: Date.now(),
                  access_token: accessToken,
                  shows_going: [],
                  shows_interested: [],
                  friends: [],
                  venue_pages: []
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
));
//-------------------------
passport.serializeUser(function(user, done) {
    console.log("serializeUser()");
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
//-------------------------
var app = express();
app.use(require('cookie-parser')("showgo"));
app.use(require('express-session')({
    resave:false,
    saveUninitialized:false,
    secret: env.hashSecret
}));
//-------------------------
app.use(passport.initialize());
app.use(passport.session());
//-------------------------

app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

mongoose.createConnection('mongodb://localhost/users');
mongoose.createConnection('mongodb://localhost/events');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Get our API routes
app.use('/api', api);


function isLoggedIn(req, res, next) {
    console.log("isLoggedIn()");
    console.log(req.user);
    req.loggedIn = !!req.user;
    next();
}

app.get('/loginCheck', function(req, res) {
    console.log("/loginCheck");
    if (!!req.user) {
        console.log("logged in");
        res.json({"status": true});
    }
    else {
        console.log("not logged in");
        res.json({"status": false});
    }
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/error'
}));

app.get('/getUser', isLoggedIn, function(req, res){
  console.log("/getUser");
  res.json(req.user);
});

app.get('/logout', function(req, res){
  console.log("/logout");
  req.logout();
  res.redirect('/');
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.redirect('/');
  //res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('error');
});
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

