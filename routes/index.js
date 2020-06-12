import { auth } from "./Auth";
import { Users } from "../mongo";
module.exports = (router) => {
  router.get("/", auth.signin);
  return router;
};
