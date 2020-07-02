import { Request, Response, NextFunction } from "express";
import Controller from "../controller";
import User, { IUserSchema } from "../../schema/User";

class AuthController extends Controller {
	/**
	 * @description 로그인 및 토큰 발급
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async signin(req: Request, res: Response, next: NextFunction) {
		try {
			let { userid, passwd } = req.body;
			let user = await User.findOne({ userid });
			if (await user.checkPassword(passwd)) {
				return res.status(200).send({
					token: user.getToken(),
				});
			} else {
				return next("비밀번호가 일치하지 않습니다.");
			}
		} catch (err) {
			return next(err);
		}
	}
	/**
	 * @description 회원가입
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async signup(req: Request, res: Response, next: NextFunction) {
		try {
			let json = {
				userid: req.body.userid,
				passwd: req.body.passwd,
			};
			let user = await User.findOne({ userid: json.userid });
			if (user) return next("이미 존재하는 계정입니다");
			else {
				let newUser = new User(json);
				return res.status(200).send(await newUser.save());
			}
		} catch (err) {
			return next(err);
		}
	}
	/**
	 * @description 토큰으로 유저 정보 가져오기
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async getProfile(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;
		res.send(user);
	}
}

export default new AuthController();
