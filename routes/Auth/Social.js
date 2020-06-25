import { Users } from "../../mongo";
import rndString from "randomstring";
import passport from "passport";
import FacebookKey from "../../path/social/fb.json";
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       //   clientID: GOOGLE_CLIENT_ID,
//       //   clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://yourdormain:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

passport.use(
  new FacebookStrategy(
    {
      clientID: FacebookKey.APP_ID,
      clientSecret: FacebookKey.APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
    }
  )
);

const Social = {
  facebook: async (req, res) => {
    return res.status(200).json({ message: "success!" });
  },
};
export { passport, Social };
