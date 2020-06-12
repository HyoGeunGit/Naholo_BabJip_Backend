import { Users } from "../../mongo";
import rndString from "randomstring";
// $2a$10$llw0G6IyibUob8h5XRt9xuEuRSK5AhWkj0qTtYqaOpKvw0D3v6b7S
import bCrypt from "../../func/bcrypt/bCrypt";
export const auth = {
  signin: async (req, res) => {
    let user = await Users.findOne({ id: req.body.id });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    let chk = await bCrypt.compareSync(req.body.passwd, user.passwd);
    if (chk) {
      try {
        let refreshToken = rndString.generate(25);

        let updateResult = await Users.update(
          { token: user.token },
          {
            $set: { token: refreshToken },
          }
        );
        user.token = refreshToken;
        user.passwd = undefined;
      } catch (e) {
        return res.status(500).json({ message: "ERR!" });
      }
      return res.status(200).json(user);
    } else return res.status(404).json({ message: "User Not Found!" });
  },
  signup: async (req, res) => {
    const pw = (pw) => {
      return new Promise((resolve, reject) => {
        bCrypt.hash(
          req.body.passwd,
          "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh.",
          null,
          (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
          }
        );
      });
    };
    let json = {
      ...req.body,
      passwd: await pw(req.body.passwd),
      token: rndString.generate(25),
    };
    try {
      let newUser = new Users(json);
      let result = await newUser.save();
      newUser.passwd = undefined;
      return res.status(200).json(newUser);
    } catch (e) {
      console.log(e);
      return e.code === 11000
        ? res
            .status(409)
            .json({ message: "User duplicate!", duplicateKey: e.keyValue })
        : res.status(500).json({ message: "ERR!" });
    }
  },
  duplicateChk: async (req, res) => {
    let user = await Users.findOne({ id: req.body.id });
    if (!user) return res.status(200).json({ message: "success!" });
    else return res.status(409).json({ message: "ID duplicate!" });
  },
  autoLogin: async (req, res) => {
    let user = await Users.findOne({ token: req.params.token });
    if (!user)
      return res
        .status(404)
        .json({ message: "token expiration or User Not Found" });
    else {
      user.passwd = undefined;
      return res.status(200).json(user);
    }
  },
  aa: async (req, res) => {
    let result = await Users.find();
    res.send(result);
  },
};
