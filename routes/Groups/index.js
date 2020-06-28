import { Users, Groups } from "../../mongo";
import rndString from "randomstring";

async function getUserNick(arr) {
  let returnArr = [];
  let result = await Users.inventory.insertMany(arr);
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
    return res.status(200).json({
      maxPage: Math.floor(Groups.count() / 10),
    });
  },
  joinGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let group = await Groups.findOne({ _id: req.body.groupToken });
      if (!group) return res.status(404).json({ message: "Group Not Found" });
      else {
        group.users.push(user._id);
        return res.status(200).json(await group.save());
      }
    }
  },
  searchGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    let searchData = {
      groupName: req.body.groupName,
      food: req.body.food,
    };
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      let groups = await Groups.find(searchData);
      return res.status(200).json(groups);
    }
  },
};
