import { Users } from "../../mongo";
import { admin } from "../../firebase/index";
import rndString from "randomstring";

const FindORSearch = (req, res, info) => {
  return new Promise(async (resolve, reject) => {
    let user = await Users.findOne({ uuid: info.uid });
    if (user) resolve(user);
    else {
      let new_user = {
        name: info.name,
        email: info.email,
        uuid: info.uid,
        termsChk: true,
        eventChk: true,
        //password

        // phone
        // birth
        // sex
      };
    }
  });
};
async function returnSuccess(req, res, info, social) {
  if (!info.email) return res.status(401).json({ message: "Exception Email" });
  else {
    return res.status(200).json({
      name: info.name,
      email: info.email,
      uuid: info.uid,
      profileImgUrl: info.picture, // 얘는 firebase bucket 적용
      social: social,
    });
  }
}
const Social = {
  facebook: async (req, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        console.log(decodedToken);
        console.log(decodedToken.firebase.identities);
        return returnSuccess(req, res, decodedToken, "facebook");
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ message: "User Not Found!" });
      });
  },
  google: async (req, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        return returnSuccess(req, res, decodedToken, "google");
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ message: "User Not Found!" });
      });
  },
};
export { Social };
