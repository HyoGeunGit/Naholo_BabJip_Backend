import { Users } from "../../mongo";
import rndString from "randomstring";
import { admin } from "../../firebase";
export const Chat = {
  chatList: async (req, res) => {
    let user = await Users.findOne({ token: req.body.token });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let db = admin.database().ref(`${req.body.groupUUID}`);
    let data = await db.once("value", async (snapshot) => {
      let return_data = {};
      await snapshot.map((childSnapshot) => {
        return_data = childSnapshot;
      });
      return return_data;
    });
    res.status(200).json(data);
  },
};
