import { Groups } from "../../mongo/Schema/Group";
import { Users } from "../../mongo";

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
    if (!user) return res.status(404).json({ message: "token expiration or User Not Found" });
    else {
      let groups = await Groups.find();
      return res.status(201).json(groups);
    }
  },
};
