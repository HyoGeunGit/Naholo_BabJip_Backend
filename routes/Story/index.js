import { Users, Stories, BackupStories } from "../../mongo";
import rndString from "randomstring";
import { default as saveStoryImage } from "../../func/resourceManager/saveStoryImage";
// const url = "http://127.0.0.1:8001/";
const url = "http://13.59.89.201:8001/";
export const Story = {
  add: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let beforeStory = await Stories.findOne({ userUUID: user.uuid });
    if (beforeStory) {
      let result = await Stories.deleteMany({
        userUUID: user.uuid,
      });
    }
    let storyUUID = rndString.generate(40);
    let storyImage = await saveStoryImage(user.uuid, storyUUID, [req.body.img]);
    let json = {
      userUUID: user.uuid,
      userName: user.nick,
      userProfileImgUrl: user.profileImgUrl,
      imgUrl: url + storyImage[0],
      storyUUID: storyUUID,
    };
    let newStory = new Stories(json);
    let newBackup = new BackupStories(json);
    try {
      let result = await newStory.save();
      let backupResult = await newBackup.save();
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      return res.status(500).json({ message: "ERR!" });
    }
  },
  watchStory: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let story = await Stories.findOne({ storyUUID: req.body.storyUUID })
      .where("alreadyWatch")
      .nin([user.uuid]);
    if (!story) return res.status(409).json({ message: "User Duplicate!" });
    story.alreadyWatch.push(user.uuid);
    return res.status(200).json(await story.save());
  },
  readWatchStory: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let story = await Stories.findOne({ storyUUID: req.body.storyUUID });
    let users = await Users.find(
      { uuid: { $in: story.alreadyWatch } },
      { nick: 1, profileImgUrl: 1 }
    );
    return res.status(200).json(users);
  },
  findUserStory: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let stories = await Stories.find({ userUUID: user.uuid });
    if (stories.length === 0)
      return res.status(404).json({ message: "Story Not Found!" });
    else return res.status(200).json(stories);
  },
  findUserBackupStory: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let stories = await BackupStories.find({ userUUID: user.uuid });
    if (stories.length === 0)
      return res.status(404).json({ message: "Story Not Found!" });
    else return res.status(200).json(stories);
  },
  getStoryList: async (req, res) => {
    let stories = await Stories.aggregate([{ $sample: { size: 10 } }]);
    if (stories.length === 0)
      return res.status(404).json({ message: "Story Not Found!" });
    else {
      return res.status(200).json(stories);
    }
  },
  delStory: async (req, res) => {
    try {
      let result = await Stories.deleteOne({
        storyUUID: req.body.storyUUID,
      });
      result = await BackupStories.deleteOne({
        storyUUID: req.body.storyUUID,
      });
      return res.status(200).json({ message: "success!" });
    } catch (e) {
      return res.status(500).json({ message: "ERR!" });
    }
  },
  bb: async (req, res) => {
    let result = await Stories.find();
    res.send(result);
  },
  cc: async (req, res) => {
    let result = await BackupStories.find();
    res.send(result);
  },
};
