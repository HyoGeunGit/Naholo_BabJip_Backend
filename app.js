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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "1gb", extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", useRouter);

app.listen(process.env.PORT || 8001, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/**
// base64 to image 테스트 코드

import resourceSave from "./func/resourceManager/resourceSave";
import base64ToImage from "./func/resourceManager/base64ToImage";

let imgData = base64ToImage(`data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=`);
resourceSave(`test.${imgData.imgType}`, imgData.imgFile);
 */

export default app;
