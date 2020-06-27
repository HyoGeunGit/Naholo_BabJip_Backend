module.exports = matching;

function matching(socket, io) {
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
          if (v.isVip && v.sex !== sex) {
            io.sockets.sockets[v.id].leave("onetoone", () => {
              io.to(v.id).emit("매칭되었습니다."); // 그룹 만들고 리턴
              io.to(socket.id).emit("매칭되었습니다");
            });
            socket.leave("onetoone");
          } else {
            io.sockets.sockets[v.id].leave("onetoone");
            socket.leave("onetoone");
            io.to(v.id).emit("매칭되었습니다."); // 그룹 만들고 리턴
            io.to(socket.id).emit("매칭되었습니다");
          }
        }
      });
    });
  });
}
