import rndString from "randomstring";
module.exports = matching;

function matching(io) {
  let matchingOneToOne = [];

  io.on("connection", (socket) => {
    console.log("new user! : ", socket.id);
    socket.on("join onetoone", (isVip, sex, uuid) => {
      matchingOneToOne.push({
        id: socket.id,
        isVip: isVip,
        sex: sex,
        uuid: uuid,
      });
      for (var i = 0; i < matchingOneToOne[i].length; i++) {
        var v = matchingOneToOne[i];
        if (v.isVip) {
          if (v.sex !== sex) {
            let groupUUID = rndString.generate(40);
            matchingOneToOne.splice(i, 1);
            matchingOneToOne.splice(matchingOneToOne.length - 1, 1);
            io.to(v.id);
            io.to(socket.id).emit("matching success", groupUUID);
            break;
          }
        } else {
          if (isVip) {
            if (v.sex !== sex) {
              let groupUUID = rndString.generate(40);
              matchingOneToOne.splice(i, 1);
              matchingOneToOne.splice(matchingOneToOne.length - 1, 1);
              io.to(v.id);
              io.to(socket.id).emit("matching success", groupUUID);
              break;
            }
          } else {
            let groupUUID = rndString.generate(40);
            matchingOneToOne.splice(i, 1);
            matchingOneToOne.splice(matchingOneToOne.length - 1, 1);
            io.to(v.id);
            io.to(socket.id).emit("matching success", groupUUID);
            break;
            break;
          }
        }
      }
    });
  });
}
