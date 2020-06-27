import { auth } from "./Auth";
import { Story } from "./Story";
import { Place } from "./Place";
import rndstring from "randomstring";
import multer from "multer";
import { useStorage } from "../func/firebase/storage";
module.exports = (router) => {
  // router.get("/", auth.aa);
  router.post("/aa", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.post("/autoLogin", auth.autoLogin);

  router.post("/addImg", async (req, res) => {
    let result = useStorage.uploadProfile(req.body.img);
    res.send(result);
  });
  router.post("/addStory", Story.add);
  router.post("/findUserStory", Story.findUserStory);
  router.post("/findUserBackupStory", Story.findUserBackupStory);
  router.post("/getStoryList", Story.getStoryList);
  router.post("/delStory", Story.delStory);
  router.get("/bb", Story.bb);
  router.get("/cc", Story.cc);

  router.post("/getPlace", Place.find);
  router.post("/getCategory", Place.category);
  router.post("/getDetail", Place.detail);

  return router;
};
