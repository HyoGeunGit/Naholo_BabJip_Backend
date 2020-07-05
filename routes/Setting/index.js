import { Users } from "../../mongo";
import { admin } from "../../firebase";
import saveProfileImage from "../../func/resourceManager/saveProfileImage";
const url = "http://13.59.89.201:8001/";

const fireDB = admin.firestore();
export const Setting = {
  nick: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    try {
      if (user.nick === req.body.nick)
        return res.status(209).json({ message: "Same Your Before Nickname" });
      user.nick = req.body.nick;
      let result = await user.save();
      await fireDB
        .collection("Users")
        .doc(user.uuid)
        .update({ name: req.body.nick });
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      console.log(e.code);
      if (e.code === 11000)
        return res.status(409).json({ message: "Nick Duplicate!" });
      return res.status(500).json({ message: "ERR!" });
    }
  },
  profileImg: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    try {
      let img = await saveProfileImage(user.uuid, req.body.profileImage);
      user.profileImgUrl = url + img;
      let result = await user.save();
      await fireDB
        .collection("Users")
        .doc(user.uuid)
        .update({ profileImg: url + img });
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      return res.status(500).json({ message: "ERR!" });
    }
  },
};
