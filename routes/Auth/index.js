import { Users } from "../../mongo";
import rndString from "randomstring";
// $2a$10$llw0G6IyibUob8h5XRt9xuEuRSK5AhWkj0qTtYqaOpKvw0D3v6b7S
import bCrypt from "../../func/bcrypt/bCrypt";
import { admin } from "../../firebase";
import saveProfileImage from "../../func/resourceManager/saveProfileImage";
const url = "http://13.59.89.201:8001/";
const fireDB = admin.firestore();
export const auth = {
  setFCM: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (user) return res.status(404).json({ message: "User Not Found!" });
    let fbResult = await fireDB
      .collection("Users")
      .doc(user.uuid)
      .update({ FCM: req.body.FCM });
    return res.status(200).json({ message: "success!" });
  },
  signin: async (req, res) => {
    let user = await Users.findOne({ id: req.body.id });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let chk = await bCrypt.compareSync(req.body.passwd, user.passwd);
    if (chk) {
      try {
        let refreshToken = rndString.generate(25);

        let updateResult = await Users.update(
          { token: user.token },
          {
            $set: { token: refreshToken },
          }
        );
        user.token = refreshToken;
        user.passwd = undefined;
      } catch (e) {
        return res.status(500).json({ message: "ERR!" });
      }
      if (!user.termsChk) return res.status(203).json(user);
      return res.status(200).json(user);
    } else return res.status(404).json({ message: "User Not Found!" });
  },
  signup: async (req, res) => {
    const pw = (pw) => {
      return new Promise((resolve, reject) => {
        bCrypt.hash(
          req.body.passwd,
          "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh.",
          null,
          (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
          }
        );
      });
    };
    let userUUID = rndString.generate(38);
    let profileImage = await saveProfileImage(userUUID, req.body.profileImage);
    let json = {
      ...req.body,
      passwd: await pw(req.body.passwd),
      token: rndString.generate(25),
      uuid: userUUID,
      profileImgUrl: url + profileImage,
    };
    try {
      let newUser = new Users(json);
      let result = await newUser.save();
      newUser.passwd = undefined;
      let fbResult = await fireDB.collection("Users").doc(json.uuid).set(
        {
          FCM: "",
          name: json.nick,
          profileImg: "",
        },
        { merge: true }
      );
      return res.status(200).json(newUser);
    } catch (e) {
      console.log(e);
      return e.code === 11000
        ? res
            .status(409)
            .json({ message: "User duplicate!", duplicateKey: e.keyValue })
        : res.status(500).json({ message: "ERR!" });
    }
  },
  duplicateChk: async (req, res) => {
    let user = await Users.findOne({ id: req.body.id });
    if (!user) return res.status(200).json({ message: "success!" });
    else return res.status(409).json({ message: "ID duplicate!" });
  },
  autoLogin: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      if (!user.termsChk)
        return res
          .status(203)
          .json({ message: "Non-Authoritative Information" });
      user.passwd = undefined;
      return res.status(200).json(user);
    }
  },
  termsChk: async (req, res) => {
    function strToBool(str) {
      if (str === "true" || str === "TRUE") return true;
      else return false;
    }
    if (!strToBool(req.body.terms))
      return res.status(203).json({ message: "Non-Authoritative Information" });
    try {
      let result = await Users.update(
        { token: req.body.token },
        {
          $set: {
            termsChk: await strToBool(req.body.terms),
            eventChk: await strToBool(req.body.event),
          },
        }
      );
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      return res.status(500).json({ message: "ERR!" });
    }
  },
  aa: async (req, res) => {
    let result = await Users.find();
    res.send(result);
  },
};
