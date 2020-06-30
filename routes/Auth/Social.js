import { Users } from "../../mongo";
import { admin } from "../../firebase/index";
import rndString from "randomstring";
import passport from "passport";

const FindORSearch = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let user = await Users.findOne({ _id: req.body.uuid });
    if (user) {
      return res.status(409).json({ message: "User duplicate!" });
    } else {
      let new_user = {
        name: req.body.name,
        id: req.body.email,
        email: req.body.email,
        sex: req.body.sex,
        nick: req.body.nick,
        birth: req.body.birth,
        phone: req.body.phone,

        password: rndString.generate(30),
        token: rndString.generate(25),
        termsChk: true,
        eventChk: true,
      };
      try {
        new_user = new Users(new_user);
        let result = await new_user.save();
        return res.status(200).json(new_user);
      } catch (e) {
        return e.code === 11000 ? res.status(409).json({ message: "User duplicate!", duplicateKey: e.keyValue }) : res.status(500).json({ message: "ERR!" });
      }
    }
  });
};
async function returnSuccess(req, res, info, social) {
  let user = await Users.findOne({ _id: info.uid });
  if (user) {
    return res.status(201).json(user);
  } else if (!info.email) return res.status(401).json({ message: "Exception Email" });
  else {
    return res.status(200).json({
      _id: info._id,
      name: info.name,
      email: info.email,
      profileImgUrl: info.picture, // 얘는 firebase bucket 적용
      social: social,
    });
  }
}
const Social = {
  verifyThen: async (req, res) => {
    FindORSearch(req, res);
  },
  facebook: async (req, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        return returnSuccess(req, res, decodedToken, "facebook");
      })
      .catch((err) => {
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
        return res.status(404).json({ message: "User Not Found!" });
      });
  },
  kakao: async (req, res) => {
    let { user } = req;
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    return returnSuccess(
      req,
      res,
      {
        name: user.properties.nickname,
        email: user.kakao_account.email,
        _id: user.id,
        profileImgUrl: user.properties.profile_image,
      },
      "kakao"
    );
  },
};
export { Social };
