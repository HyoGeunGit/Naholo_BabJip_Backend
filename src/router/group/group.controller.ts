import { Request, Response, NextFunction } from "express";
import Controller from "../controller";
import { IUserSchema } from "../../schema/User";
import Group, { IGroup } from "../../schema/Group";

class GroupController extends Controller {
	/**
	 * @description 그룹 생성
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async createGroup(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		let data = req.body as IGroup;
		let group = new Group(data);

		group = await group.save();

		await user.joinGroup(group);

		return res.status(201).json(group);
	}
	/**
	 * @description 그룹 읽기 (offset부터 limit개)
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async readGroups(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		let offset: number = Number(req.query.offset); // 시작지점
		let limit: number = Number(req.query.limit); // 갯수
		let groups;
		if (!isNaN(offset) && !isNaN(offset))
			groups = await Group.find({ users: { $nin: user._id } })
				.limit(limit)
				.skip(offset);
		else groups = await Group.find({ users: { $nin: user._id } });
		return res.status(200).json(groups);
	}
	/**
	 * @description 그룹 갯수
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async getGroupsCount(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		return res.status(200).json(await Group.count({ users: { $nin: user._id } }));
	}
	/**
	 * @description 그룹 하나 읽기
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async readGroup(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		let groupId = req.params._id;

		return res.status(200).json(await Group.findOne({ _id: groupId }));
	}
	/**
	 * @description 그룹 맴버 가져오기
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async readGroupMember(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		let groupId = req.params._id;
		let group = await Group.findOne({ _id: groupId });
		group = await group.populate("users", "profileImgUrl nick").execPopulate();
		return res.status(200).json(group.users);
	}
	// TODO: 본인이 포함된 그룹 정보 가져오기는 auth에 작성
	// TODO: joinGroup
	// TODO: searchGroup
}

export default new GroupController();
