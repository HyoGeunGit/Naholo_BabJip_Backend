import rndString from "randomstring";
module.exports = matching;

function addGroup(groupUUID, uuid1, uuid2) {}
function matching(io) {
  let matchingOneToOne = [];
  io.on("connection", (socket) => {
    console.log("new user! : ", socket.id);
    socket.on("join onetoone", (isVip, sex, uuid) => {
      var chk = 1;
      for (var i = 0; i < matchingOneToOne.length; i++) {
        var v = matchingOneToOne[i];
        if (v.id !== socket.id && v.uuid !== uuid) {
          if (v.isVip) {
            if (v.sex !== sex) {
              let groupUUID = rndString.generate(40);
              matchingOneToOne.splice(i, 1);
              io.to(v.id);
              io.to(socket.id).emit("matching success", groupUUID);
              chk = false;
              break;
            }
          } else {
            if (isVip) {
              if (v.sex !== sex) {
                let groupUUID = rndString.generate(40);
                matchingOneToOne.splice(i, 1);
                io.to(v.id);
                io.to(socket.id).emit("matching success", groupUUID);
                chk = false;
                break;
              }
            } else {
              let groupUUID = rndString.generate(40);
              matchingOneToOne.splice(i, 1);
              io.to(v.id);
              io.to(socket.id).emit("matching success", groupUUID);
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
