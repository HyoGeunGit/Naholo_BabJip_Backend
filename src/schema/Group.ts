import { Model, Schema, Document, model, HookNextFunction, Mongoose } from "mongoose";
import { ObjectID } from "bson";
import createEncryptionPassword from "../modules/lib/createEncryptionPassword";

export interface IGroup {
	groupName: string; // 그룹 이름
	users: Array<ObjectID>; // 참여자 배열 (user._id 사용)
	maximum: number; // 최대 참가자
	lat: string; // 경도
	lng: string; // 위도
	vicinity: string; //주소
	time: string; // 만날 시간 ex 9시 ~ 10시 ( PM )
	isAdult: boolean; // 19세
	category: string; // 카테고리
	groupType: string; // "group" = 그룹, "onebyone" = 1대1
}
export const GroupSchema: Schema = new Schema({
	groupName: { type: String }, // 그룹 이름
	users: [{ type: Schema.Types.ObjectId, ref: "User" }], // 참여자 배열 (user._id 사용)
	maximum: { type: Number }, // 최대 참가자
	lat: { type: String }, // 경도
	lng: { type: String }, // 위도
	vicinity: { type: String }, //주소
	time: { type: String }, // 만날 시간 ex 9시 ~ 10시 ( PM )
	isAdult: { type: Boolean, default: false }, // 19세
	category: { type: String }, // 카테고리
	groupType: { type: String, default: "group" }, // "group" = 그룹, "onebyone" = 1대1
});

/**
 * @description Group 스키마에 대한 메서드 ( document )
 */
export interface IGroupSchema extends IGroup, Document {}

/**
 * @description Group 모델에 대한 정적 메서드 ( collection )
 */
export interface IGroupModel extends Model<IGroupSchema> {}

export default model<IGroupSchema>("Group", GroupSchema) as IGroupModel;
