import { auth } from "./Auth";
import { Story } from "./Story";
import { Place } from "./Place";
import rndstring from "randomstring";
import multer from "multer";
import { group } from "./Group";
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/"); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
	},
	filename: (req, file, cb) => {
		var newStr = rndstring.generate(33);
		newStr = newStr + ".PNG";
		cb(null, newStr);
	},
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
});
const upload = multer({ storage: storage });
module.exports = (router) => {
	// router.get("/", auth.aa);
	router.post("/aa", auth.aa);
	router.post("/signin", auth.signin);
	router.post("/signup", auth.signup);
	router.post("/duplicateChk", auth.duplicateChk);
	router.post("/termsCheck", auth.termsChk);
	router.post("/autoLogin", auth.autoLogin);

	router.post("/addStory", upload.single("img"), Story.add);
	router.post("/findUserStory", Story.findUserStory);
	router.post("/findUserBackupStory", Story.findUserBackupStory);
	router.post("/getStoryList", Story.getStoryList);
	router.post("/delStory", Story.delStory);
	router.get("/bb", Story.bb);
	router.get("/cc", Story.cc);

	router.post("/getPlace", Place.find);
	router.post("/getCategory", Place.category);

	router.post("/createGroup", group.createGroup);
	router.post("/readGroup", group.readGroup);
	return router;
};
