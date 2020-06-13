import { auth } from "./Auth";
import { Users } from "../mongo";
module.exports = (router) => {
  // router.get("/", auth.aa);
  // router.post("/aa", auth.aa);
  router.post("/signin", auth.signin);
  router.post("/signup", auth.signup);
  router.post("/duplicateChk", auth.duplicateChk);
  router.post("/termsCheck", auth.termsChk);
  router.post("/autoLogin", auth.autoLogin);
  return router;
};
