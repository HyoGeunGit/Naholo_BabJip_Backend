import rndString from "randomstring";
module.exports = matching;

function matching(io) {
  let matchingOneToOne = [];

  io.on("connection", (socket) => {
    console.log("new user! : ", socket.id);
    socket.on("join onetone", (isVip, sex) => {
      socket.join("onetoone");
      matchingOneToOne.push({
        id: socket.id,
        isVip: isVip,
        sex: sex,
      });
      matchingOneToOne.some((v) => {
        if (v.id == socket.id) return true;
        else {
          if (v.isVip) {
            if (v.sex !== sex) {
              io.sockets.sockets[v.id].leave("onetoone", () => {
                let groupUUID = rndString.generate(40);
                io.to(v.id).emit(groupUUID); // 그룹 만들고 리턴
                io.to(socket.id).emit(groupUUID);
                socket.leave("onetoone");
              });
            } else return true;
          } else {
            io.sockets.sockets[v.id].leave("onetoone", () => {
              let groupUUID = rndString.generate(40);
              io.to(v.id).emit(groupUUID); // 그룹 만들고 리턴
              io.to(socket.id).emit(groupUUID);
              socket.leave("onetoone");
            });
          }
        }
      });
    });
  });
}
