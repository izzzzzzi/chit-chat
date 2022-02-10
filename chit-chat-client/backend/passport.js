const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "57244848204-9mrjs1onnjglbfj0u42c7b5bk8cam6d7.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile)
    // const user = {
    //   username: profile.displayName,
    //   avatar: profile.photos[0],
    // };
    // user.sa
  }
)
);

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(user,null)
})