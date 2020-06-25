import { Users } from "../../mongo";
import { admin } from "../../firebase/index";
import rndString from "randomstring";

const Social = {
  facebook: async (req, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        console.log(decodedToken);
        return res.status(200).json({ message: "success!" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ message: "User Not Found!" });
      });
    return res.status(200).json({ message: "success!" });
  },
};
export { Social };
