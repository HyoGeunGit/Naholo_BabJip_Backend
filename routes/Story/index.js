import { Users, Stories, BackupStories } from "../../mongo";
import rndString from "randomstring";

export const Story = {
  add: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let newStory = new Stories({
      userUUID: user.uuid,
      userName: user.name,
      userProfileImgUrl: user.profileImgUrl,
      createdAt: req.body.createdAt,
      imgUrl: "test",
    });
    try {
      let result = await newStory.save();
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      return res.status(500).json({ message: "ERR!" });
    }
  },
  bb: async (req, res) => {
    let result = await Stories.find();
    res.send(result);
  },
};
