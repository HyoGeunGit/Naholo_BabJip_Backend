import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import moment from "moment";
import "moment-timezone";
import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao-token";
import http from "http";
import socket from "socket.io";

var server = http.Server(app);
var io = socket(server);

require("./mongo");
let app = express();
let router = express.Router();
const port = 3000;
let useRouter = require("./routes/index")(router);
moment.tz.setDefault("Asia/Seoul");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "1gb", extended: false }));

app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new KakaoStrategy(
    {
      clientID: "28066e4d44aac43615d832a105498181",
      clientSecret: "6kpg6kiYjAvMr3eL5O2T6XHJIjL4d6Fd",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile._json);
    }
  )
);
app.use(passport.initialize());

app.use("/", useRouter);
require("./routes/Matching/index.js")(io);
server.listen(process.env.PORT || 8001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

export default app;
