import { Users, Groups } from "../../mongo";

export const group = {
  createGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "token expiration or User Not Found" });
    else {
      let data = req.body;
      let group = new Groups(data);
      group.users.push(user._id);
      group = await group.save();
      return res.status(201).json(group);
    }
  },
  readGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    let index = req.param.index; // start index : 0
    if (!user) return res.status(404).json({ message: "token expiration or User Not Found" });
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
    if (!user) return res.status(404).json({ message: "token expiration or User Not Found" });
    else {
      let group = await Groups.findOne({ token: req.body.groupToken });
      if (!group) return res.status(404).json({ message: "Group Not Found" });
      else {
        group.users.push(user._id);
        return res.status(200).json(group);
      }
    }
  },
  searchGroup: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    let searchData = {
      groupName: req.body.groupName,
      food: req.body.food,
    };
    if (!user) return res.status(404).json({ message: "token expiration or User Not Found" });
    else {
      let groups = await Groups.find(searchData);
      return res.status(200).json(groups);
    }
  },
};
