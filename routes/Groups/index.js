import { Users, Groups } from "../../mongo";
import rndString from "randomstring";
import { admin } from "../../firebase";
const db = admin.database();
async function getUserNick(arr) {
  let result = await Users.find({ uuid: { $in: arr } });
  let returnArr = [];
  await result.map((item) => {
    let { profileImgUrl, nick, uuid } = item;
    returnArr.push({ profileImgUrl, nick, uuid });
  });
  return returnArr;
}
const fireDB = admin.firestore();
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
      db.ref(group.groupUUID + "/welcome").set({
        message: "그룹이 생성되었습니다.",
        timeStamp: "1593480463168",
        userModel: {
          name: "ADMIN",
          photo_profile:
            "https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_1280.jpg",
        },
      });
      let fbResult = await fireDB
        .collection("Groups")
        .doc(group.groupUUID)
        .set(
          {
            users: [fireDB.doc(`/Users/${user.uuid}`)],
          },
          { merge: true }
        );
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
      let groups = await Groups.find({
        users: { $nin: user.uuid },
        groupType: "group",
        $where: "this.users.length < this.maximum",
      })
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
      maxPage: Math.floor(
        Groups.count({
          users: { $nin: user.uuid },
          groupType: "group",
          $where: "this.users.length < this.maximum",
        }) / 10
      ),
    });
  },
  readGroupAll: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.find({
      users: { $nin: user.uuid },
      groupType: "group",
      $where: "this.users.length < this.maximum",
    });
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
  readGroupMember: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    let group = await Groups.findOne({ groupUUID: req.body.groupUUID });
    let userNick = await getUserNick(group.users);
    return res.status(200).json(userNick);
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
        let fbResult = await fireDB
          .collection("Groups")
          .doc(req.body.groupUUID)
          .update({
            users: admin.firestore.FieldValue.arrayUnion(
              fireDB.doc(`/Users/${user.uuid}`)
            ),
          });
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
      let groups = await Groups.find({
        groupType: "group",
        $where: "this.users.length < this.maximum",
        $or: searchQuery,
      })
        .where("users")
        .nin([user.uuid]);
      return res.status(200).json(groups);
    }
  },
};
