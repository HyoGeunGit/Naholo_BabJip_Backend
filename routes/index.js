import { auth } from "./Auth";
import { Story } from "./Story";
import { Place } from "./Place";
import rndstring from "randomstring";
import multer from "multer";
import { bucket } from "../func/firebase/storage";
import { passport, Social } from "./Auth/Social";
// require("./Auth/Social");
module.exports = (router) => {
  // router.get("/", auth.aa);
  router.post("/aa", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.post("/autoLogin", auth.autoLogin);

  router.post(
    "/social/facebook",
    passport.authenticate("facebook", {
      scope: ["user_friends", "manage_pages"],
    }),
    Social.facebook
  );
  router.get(
    "/social/facebookTest",
    passport.authenticate("facebook", {
      failureRedirect: "/asdf",
    }),
    Social.facebookTest
  );
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

  router.get("/asdf", async (req, res) => {
    const config = {
      action: "list",
      expires: "03-17-2025",
    };
    bucket.getSignedUrl(config).then((data) => {
      return res.send(data[0]);
    });
  });
  return router;
};
