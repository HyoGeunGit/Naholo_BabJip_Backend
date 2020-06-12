import express from "express";
let app = express();
import bodyParser from "body-parser";
import rndstring from "randomstring";
import cors from "cors";
import path from "path";

app.use(cors());
app.use(bodyParser.json({ limit: "10gb" }));
app.use(bodyParser.urlencoded({ limit: "10gb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

require("./mongo");
const port = 3000;

app.listen(process.env.PORT || 8001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

export default app;
