import { Users, Groups } from "../../mongo";
import rndString from "randomstring";

async function getUserNick(arr) {
  let returnArr = [];
  let result = await Users.find(arr);
  return result;
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
      group.users.push({ uuid: user.uuid });
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
      let groups = await Groups.find()
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
      maxPage: Math.floor(Groups.count() / 10),
    });
  },
  readGroupAll: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.find();
    return res.status(200).json(group);
  },
  readGroupInfo: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.findOne({ groupUUID: req.body.groupUUID });
    let userNick = await getUserNick(group.user);
    console.log(userNick);
    return res.status(200).json(group);
  },
  joinGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let group = await Groups.findOne({ groupUUID: req.body.groupUUID });
      if (!group) return res.status(404).json({ message: "Group Not Found" });
      else {
        group.users.push({ _id: user._id, uuid: user.uuid });
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
      let groups = await Groups.find({ $or: searchQuery });
      return res.status(200).json(groups);
    }
  },
};
