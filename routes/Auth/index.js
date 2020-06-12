import { Users } from "../../mongo/Schema/Users";
import rndString from "randomstring";

export const auth = {
  signin: async (req, res) => {
    // let result = await Users.find();
    let result = await Users.findOne({ token: "asd" });
    return res.send("asd");
  },
  signup: async (req, res) => {},
  autoLogin: async (req, res) => {},
};
