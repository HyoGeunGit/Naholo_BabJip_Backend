import { auth } from "./Auth";
import { Users } from "../mongo";
module.exports = (router) => {
  // router.get("/", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.get("/autoLogin/:token", auth.autoLogin);
  return router;
};
