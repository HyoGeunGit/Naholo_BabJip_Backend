import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import moment from "moment";
import "moment-timezone";
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

app.use("/", useRouter);

app.listen(process.env.PORT || 8001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

export default app;
