import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

require("./mongo");

let app = express();
let router = express.Router();
const port = 3000;
let useRouter = require("./routes/index")(router);

app.use(cors());
app.use("/", useRouter);
app.use(bodyParser.json({ limit: "10gb" }));
app.use(bodyParser.urlencoded({ limit: "10gb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 8001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

export default app;
