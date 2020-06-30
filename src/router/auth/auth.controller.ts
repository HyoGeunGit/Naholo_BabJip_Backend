import { Request, Response, NextFunction } from "express";
import Controller from "../controller";

class AuthController extends Controller {
	/**
	 * @description 로그인
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async login(req: Request, res: Response, next: NextFunction) {
		res.send("LOGIN"); // TODO: 로그인 로직 구현
	}
}

export default new AuthController();
