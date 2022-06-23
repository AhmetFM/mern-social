const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "565319004447-o12c60r2kgbu8r6bgggfdkctid65as4g.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
            }
    // function(accessToken, refreshToken, profile, done) {
    //     User.findOne({ googleId : profile.id }, function (err, user) {
    //     if(err) {
    //         return done(err);
    //     }
    //     if(!user) {
    //         user = new User({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             username: profile.username,
    //             provider: 'google',
    //         });
    //         user.save(function(err) {
    //             if (err) console.log(err);
    //             return done(err, user);
    //         });
    //     }else {
    //                 //found user. Return
    //                 return done(err, user);
    //         }
    //     });
    // }
));

passport.serializeUser((user,done)=> {
    done(null,user)
})

passport.deserializeUser((user,done)=> {
    done(null,user)
})