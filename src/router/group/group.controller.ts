import { Request, Response, NextFunction } from "express";
import Controller from "../controller";
import { IUserSchema } from "../../schema/User";
import Group, { IGroup, IGroupSchema } from "../../schema/Group";
import { DocumentQuery, MongooseFilterQuery } from "mongoose";

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
		let searchText = String(req.query.search);

		let query: MongooseFilterQuery<Pick<IGroupSchema, "groupName" | "groupType">>;
		let groups: IGroupSchema[];

		// 검색 쿼리가 있을 시
		if (searchText) {
			query = {
				groupType: "group",
				$where: "this.users.length < this.maximum",
				$or: [{ groupName: { $regex: searchText } }, { category: { $regex: searchText } }],
			};
		} else {
			query = { users: { $nin: user._id } };
		}

		if (!isNaN(offset) && !isNaN(offset)) groups = await Group.find(query).limit(limit).skip(offset);
		else groups = await Group.find({ query });
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
		let group = await Group.findOne({ _id: groupId });
		if (!group) return res.status(404).json({});
		else return res.status(200).json(group);
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
		if (!group) return res.status(404).json({});
		else {
			group = await group.populate("users", "profileImgUrl nick").execPopulate();
			return res.status(200).json(group.users);
		}
	}
	/**
	 * @description 그룹 참여
	 * @param {Request}req Express req
	 * @param {Response}res Express res
	 * @param {NextFunction}next Express next
	 */
	public async joinGroup(req: Request, res: Response, next: NextFunction) {
		let user = req.user as IUserSchema;

		let groupId = req.params._id;
		let group = await Group.findOne({ _id: groupId });
		if (!group) return res.status(404).json({});
		else {
			await user.joinGroup(group);
			return res.status(200).json(group);
		}
	}
	// TODO: 본인이 포함된 그룹 정보 가져오기는 auth에 작성
}

export default new GroupController();
