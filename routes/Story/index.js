import { Users, Stories, BackupStories } from "../../mongo";
import rndString from "randomstring";

// const url = "http://127.0.0.1:8001/";
const url = "http://13.59.89.201:8001/";
export const Story = {
  add: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let json = {
      userUUID: user.uuid,
      userName: user.name,
      userProfileImgUrl: user.profileImgUrl,
      imgUrl: url + req.file.filename,
      storyUUID: req.file.filename,
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
    const groupBy = (arr, property) => {
      return new Promise(async (resolve) => {
        let result = await arr.reduce((acc, obj) => {
          var key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
        resolve(result);
      });
    };
    const shuffle = (a) => {
      return new Promise((resolve) => {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
        }
        resolve(a);
      });
    };
    let stories = await Stories.find();
    groupBy(stories, "userUUID").then((returnArr) => {
      let response = [];
      for (let [key, value] of Object.entries(returnArr)) {
        response.push(value);
      }
      shuffle(response).then((resList) => {
        if (resList.length >= 10) {
          resList.length = 10;
        }
        return resList.length !== 0
          ? res.status(200).json(resList)
          : res.status(404).json({ message: "Story Not Found!" });
      });
    });
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
