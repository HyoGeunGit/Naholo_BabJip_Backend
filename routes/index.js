import { auth } from "./Auth";
import { Story } from "./Story";
import { Place } from "./Place";
import { Group } from "./Groups";
import rndstring from "randomstring";
import multer from "multer";
import { bucket } from "../func/firebase/storage";
import { Social } from "./Auth/Social";
import { Chat } from "./Chat";
import passport from "passport";
// require("./Auth/Social");
module.exports = (router) => {
  // router.get("/", auth.aa);
  router.post("/aa", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.post("/autoLogin", auth.autoLogin);

  router.post("/social/facebook", Social.facebook);
  router.post("/social/google", Social.google);
  router.post(
    "/social/kakao",
    passport.authenticate("kakao-token", { session: false }),
    Social.kakao
  );
  router.post("/social/veritySave", Social.verifyThen);

  router.post("/addStory", Story.add);
  router.post("/findUserStory", Story.findUserStory);
  router.post("/findUserBackupStory", Story.findUserBackupStory);
  router.post("/getStoryList", Story.getStoryList);
  router.post("/delStory", Story.delStory);
  router.post("/watchStory", Story.watchStory);
  router.post("/readWatch", Story.readWatchStory);

  router.post("/bb", Story.bb);
  router.post("/cc", Story.cc);
  router.post("/ff", Group.ff);
  router.post("/getPlace", Place.find);
  router.post("/getCategory", Place.category);
  router.post("/getDetail", Place.detail);

  router.post("/addGroup", Group.addGroup);
  router.post("/readGroup", Group.readGroupAll);
  router.post("/readGroup/:index", Group.readGroup);
  router.post("/readGroup/maxPage", Group.readGroupMaxPage);
  router.post("/readGroupInfo", Group.readGroupInfo);
  router.post("/readUserGroup", Group.readUserGroup);
  router.post("/readGroupMember", Group.readGroupMember);
  router.post("/joinGroup", Group.joinGroup);
  router.post("/searchGroup", Group.searchGroup);

  router.post("/readChatList", Chat.chatList);
  router.post("/searchChatList", Chat.searchChatList);
  return router;
};
