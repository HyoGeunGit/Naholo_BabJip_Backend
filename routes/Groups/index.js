import { Users, Groups } from "../../mongo";
import rndString from "randomstring";
import produce from "immer";

async function getUserNick(arr) {
  let result = await Users.find({ uuid: { $in: arr } });
  let returnArr = [];
  await result.map((item) => {
    let { profileImgUrl, nick } = item;
    returnArr.push({ profileImgUrl, nick });
  });
  return returnArr;
}
export const Group = {
  ff: async (req, res) => {
    let result = await Groups.find();
    return res.json(result);
  },
  addGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let data = req.body;
      let group = new Groups(data);
      group.groupUUID = rndString.generate(40);
      group.users.push(user.uuid);
      user.groups.push({ groupUUID: group.groupUUID, groupType: "group" });
      user = await user.save();
      group = await group.save();
      return res.status(200).json(group);
    }
  },
  readGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    let index = req.param.index; // start index : 0
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let groups = await Groups.find({ users: { $nin: user.uuid } })
        .limit(10)
        .skip(index * 10);
      return res.status(200).json(groups);
    }
  },
  readGroupMaxPage: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    return res.status(200).json({
      maxPage: Math.floor(Groups.count({ users: { $nin: user.uuid } }) / 10),
    });
  },
  readGroupAll: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.find({ users: { $nin: user.uuid } });
    return res.status(200).json(group);
  },
  readGroupInfo: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.findOne({ groupUUID: req.body.groupUUID });
    let userNick = await getUserNick(group.users);
    return res.status(200).json({
      ...group._doc,
      users: userNick,
    });
  },
  readUserGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let groupQuery = [];
    await user.groups.map((item) => {
      groupQuery.push({
        groupUUID: item.groupUUID,
      });
    });
    let userGroups = await Groups.find({ $or: groupQuery });
    return res.status(200).json(userGroups);
  },
  joinGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let group = await Groups.findOne({ groupUUID: req.body.groupUUID })
        .where("users")
        .nin([user.uuid]);
      if (!group) {
        return res
          .status(400)
          .json({ message: "User Duplicate or Group Not Found!" });
      }
      if (group.users.length >= group.maximum)
        return res
          .status(413)
          .json({ message: "The number of people is exceeded!" });
      else {
        group.users.push(user.uuid);
        user.groups.push({ groupUUID: req.body.groupUUID, groupType: "group" });
        let result = await user.save();
        return res.status(200).json(await group.save());
      }
    }
  },
  searchGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    let searchQuery = [
      { groupName: { $regex: req.body.searchText } },
      { category: { $regex: req.body.searchText } },
    ];
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let groups = await Groups.find({ $or: searchQuery })
        .where("users")
        .nin([user.uuid]);
      return res.status(200).json(groups);
    }
  },
};
