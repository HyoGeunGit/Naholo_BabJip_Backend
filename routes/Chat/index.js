import { Users, Groups } from "../../mongo";
import rndString from "randomstring";
import { admin } from "../../firebase";
const getLastMessage = async (groupUUID) => {
  try {
    let db = admin.database().ref(`${groupUUID}`);
    let data = await db.limitToLast(1).once("value", async (snapshot) => {
      let return_data = {};
      await snapshot.forEach((childSnapshot) => {
        return_data = childSnapshot;
      });
      return return_data;
    });
    let renwealData = JSON.parse(JSON.stringify(data));
    let lastKey = Object.keys(renwealData);
    return renwealData[lastKey];
  } catch (e) {
    throw e;
  }
};
export const Chat = {
  chatList: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    const getGroups = () => {
      let groupList = [];
      let lastChats = [];
      return new Promise(async (resolve, reject) => {
        for (var i = 0; user.groups[i] != null; i++) {
          const groupUUID = user.groups[i].groupUUID;
          try {
            lastChats.push(await getLastMessage(groupUUID));
            groupList.push(groupUUID);
          } catch (e) {
            reject(e);
          }
        }

        resolve({ groupList, lastChats });
      });
    };
    getGroups()
      .then(async ({ groupList, lastChats }) => {
        let groups = await Groups.find({
          groupUUID: { $in: groupList },
        });
        console.log();
        let return_data = [];
        for (var i = 0; groups[i] != null; i++) {
          return_data.push({
            ...groups[i]._doc,
            lastMessage: lastChats[i].message,
            timeStamp: lastChats[i].timeStamp,
          });
        }
        res.status(200).json(return_data);
      })
      .catch((e) => {
        res.status(404).json({ message: "Chat Room Not Found!" });
      });
  },
};
