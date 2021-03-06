
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const http = require('http');

const env = require("./.env/.env.js");
const api = require('./server/routes/api');
//const userRoutes = require('./server/routes/user');

var User = require("./models/user");
var Event = require("./models/event");
var user;
//-------------------------
//STRATEGY
//-------------------------
/*passport.use(new FacebookStrategy({
    clientID: env.facebookAppId,
    clientSecret: env.facebookAppSecret,
    callbackURL: env.facebookCallbackUrl,
    enableProof: true
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ oauthID: profile.id }, function(err, user) {
              if(err) {
                console.log("mongo find error");
                console.log(err);  // handle errors!
                done(null, null);
              }
              if (!err && user !== null) {
                console.log("existing user found.");
                //update user's access token
                user.access_token = accessToken;
                user.save(function(err) {
                  if(err) {
                    console.log("mongo save error");
                    console.log(err);  // handle errors!
                    done(null, null);
                  } else {
                    console.log("updating existing user's access token");
                    done(null, user);
                  }
                });
              } else {
                console.log("new user found.");
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
                    console.log("mongo new user save error");
                    console.log(err);  // handle errors!
                    done(null, null);
                  } else {
                    console.log("saving new user");
                    done(null, user);
                  }
                });
              }
        });
    }
));*/
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : env.facebookAppId,
        clientSecret    : env.facebookAppSecret,
        callbackURL     : env.facebookCallbackUrl

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.id    = profile.id; // set the users facebook id                   
                    newUser.access_token = token; // we will save the token that facebook provides to the user                    
                    newUser.name  = profile.displayName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
//-------------------------
//SERIALIZE & DESERIALIZE
//-------------------------
passport.serializeUser(function(user, done) {
    console.log("serializeUser()");
    console.log(user);
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    console.log("deserializeUser()");
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
//app.use('/api', api);
//app.use('/user', userRoutes);

// function isLoggedIn(req, res, next) {
//     console.log("isLoggedIn()");
//     console.log(req.user);
//     req.loggedIn = !!req.user;
//     next();
// }
function isLoggedIn(req, res, next) {
    console.log("isLoggedIn()");
    if(!!req.user) { return next(); }
    console.log("auth failed, going to /");
    res.redirect('/');
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
app.get("/error", function(req, res) {
  res.send("/error");
});
app.get("/good", function(req, res) {
  res.send("/good");
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'rsvp_event']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

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
// app.get('*', (req, res) => {
//   res.redirect('/');
// });

// 500 error handler (middleware)
/*app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('error');
});*/

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

