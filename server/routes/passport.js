// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const env = require("./.env/.env.js");

// load up the user model
var User       = require('../../models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : env.facebookAppId,
        clientSecret    : env.facebookAppSecret,
        callbackURL     : env.facebookAppCallbackUrl

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ oauthID: profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                  var user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: Date.now(),
                  });
                  user.save(function(err) {
                    if(err) {
                      throw err;
                    } else {
                      console.log("saving new user");
                      return done(null, user);
                    }
                  });
                        
                }

            });
        });

    }));

};