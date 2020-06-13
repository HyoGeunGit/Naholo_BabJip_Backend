import { auth } from "./Auth";
import { Story } from "./Story";
import { Stories } from "../mongo";
module.exports = (router) => {
  // router.get("/", auth.aa);
  router.post("/aa", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.post("/autoLogin", auth.autoLogin);

  router.post("/addStroy", Story.add);
  router.post("/findUserStory", Story.findUserStory);
  router.post("/findUserBackupStory", Story.findUserBackupStory);
  router.get("/bb", Story.bb);
  router.get("/cc", Story.cc);
  return router;
};
