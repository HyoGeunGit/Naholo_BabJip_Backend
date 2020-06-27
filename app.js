import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import moment from "moment";
import "moment-timezone";
import base64ToImage from "./func/resourceManager/base64ToImage";
import resourceSave from "./func/resourceManager/resourceSave";
import { useStorage } from "./func/firebase/storage";

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
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// useStorage.uploadProfile(
//   "data:image/gif;base64,R0lGODlhDwAOAPYBAAAAAP///+Pj5MzS6qy33bfA4sDI5dne8I6e0JGg0Zim1Jqo1aGu2H6SyZOj0HWMxYWYytbY3V98vLG801p9ulN6u2SHw0JvtYiix8vU4TBmsDBmrx9fqyJgrEB1uGCOxRpeqoGjygdXpwlYpw5aqBVhrGOUx6C+3N/p8+/0+dzd3gBVpQNWpgtdphBgqxpmqxpnqyBqsDB1tmqbx3CfzJe62Z+/3a/K46/J4r/V6c/f7t/q9AJaoQhcpAlcpVuSwh9sqC10rF+Xv5G20cXY5cba5wxnnZu7zXKfthhxmS6EloezvVqcqFeeqJq+w1SjqYC0sajNysrh3drp4trn4fD49O/18vb6+Pf5+OXs6Pz9/Pv8+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA4AAAeYgAEBThYVFxocJCwrL4KCW0gIDxIUGyAiKys6jlMhCg0TKhgdI5kzjksGDA4RKgInLpkwglhHAwQJEBmCOrErOAFUNQcFCx4uN4IpMis/AUwrJh8lKy45gjvMLQFPmZkymwG9mT4oVU2ZMSmCNt5ARYJaUDwrNgE03kHrjgFRRisxvAnhx09KEm9DCBLMoqQHEYUKrVyBGAgAOw==",
//   "test2"
// );

export default app;
