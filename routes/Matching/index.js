import rndString from "randomstring";
module.exports = matching;
import { admin } from "../../firebase";
import { Groups, Users } from "../../mongo";

let db = admin.database();
let fireDB = admin.firestore();
async function addGroup(groupUUID, uuid1, uuid2) {
  let user1 = await Users.findOne({ uuid: uuid1 });
  let user2 = await Users.findOne({ uuid: uuid2 });
  let newGroup = new Groups({
    groupType: "onebyone",
    users: [uuid1, uuid2],
    maximum: 2,
    groupUUID: groupUUID,
    groupName: user1.nick + ", " + user2.nick,
  });

  try {
    let addGroup = await newGroup.save();
    user1.groups.push({ groupUUID, groupType: "onebyone" });
    user2.groups.push({ groupUUID, groupType: "onebyone" });
    await user1.save();
    await user2.save();
    let dbResult = await db.ref(groupUUID + "/welcome").set({
      message: "그룹이 생성되었습니다.",
      timeStamp: "1593480463168",
      messageType: "welcomeMessage",
      userModel: {
        name: "ADMIN",
        photo_profile:
          "https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_1280.jpg",
      },
    });
    let fbResult = await fireDB
      .collection("Groups")
      .doc(groupUUID)
      .set({
        users: [fireDB.doc(`/Users/${uuid1}`), fireDB.doc(`/Users/${uuid2}`)],
      });
    return { u1nick: user1.nick, u2nick: user2.nick };
  } catch (e) {
    console.log("socket ERR!");
    throw e;
    return e;
  }
}
function matching(io) {
  let matchingOneToOne = [];
  io.on("connection", (socket) => {
    console.log("new user! : ", socket.id);
    socket.on("join onetoone", async (isVip, sex, uuid) => {
      var chk = 1;
      for (var i = 0; i < matchingOneToOne.length; i++) {
        var v = matchingOneToOne[i];
        if (v.id !== socket.id && v.uuid !== uuid) {
          if (v.isVip) {
            if (v.sex !== sex) {
              let groupUUID = rndString.generate(40);
              matchingOneToOne.splice(i, 1);
              const { u1nick, u2nick } = await addGroup(
                groupUUID,
                v.uuid,
                uuid
              );
              io.to(v.id).emit("matching success", [
                { groupUUID, nick: u2nick, sex },
              ]);
              io.to(socket.id).emit("matching success", [
                { groupUUID, nick: u1nick, sex: v.sex },
              ]);
              chk = false;
              break;
            }
          } else {
            if (isVip) {
              if (v.sex !== sex) {
                let groupUUID = rndString.generate(40);
                matchingOneToOne.splice(i, 1);
                const { u1nick, u2nick } = await addGroup(
                  groupUUID,
                  v.uuid,
                  uuid
                );
                io.to(v.id).emit("matching success", [
                  { groupUUID, nick: u2nick, sex },
                ]);
                io.to(socket.id).emit("matching success", [
                  { groupUUID, nick: u1nick, sex: v.sex },
                ]);
                chk = false;
                break;
              }
            } else {
              let groupUUID = rndString.generate(40);
              matchingOneToOne.splice(i, 1);
              const { u1nick, u2nick } = await addGroup(
                groupUUID,
                v.uuid,
                uuid
              );
              io.to(v.id).emit("matching success", [
                { groupUUID, nick: u2nick, sex },
              ]);
              io.to(socket.id).emit("matching success", [
                { groupUUID, nick: u1nick, sex: v.sex },
              ]);
              chk = false;
              break;
            }
          }
        } else {
          chk = false;
        }
      }
      if (chk) {
        matchingOneToOne.push({
          id: socket.id,
          isVip: isVip,
          sex: sex,
          uuid: uuid,
        });
      }
      console.log(matchingOneToOne);
    });
  });
}
