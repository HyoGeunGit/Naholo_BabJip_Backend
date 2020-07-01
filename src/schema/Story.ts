import { Model, Schema, Document, model, HookNextFunction, Mongoose } from "mongoose";
import { ObjectID } from "bson";
import createEncryptionPassword from "../modules/lib/createEncryptionPassword";

export interface IStory {
	userUUID: ObjectID;
	alreadyWatch: ObjectID;
	imgUrl: string;
	createdAt: Date;
	expireAt: Date;
	userName: string;
	userProfileImgUrl: string;
}
export const StorySchema: Schema = new Schema({
	userUUID: { type: Schema.Types.ObjectId, ref: "User" }, // 유저 uuid
	alreadyWatch: [{ type: Schema.Types.ObjectId, ref: "User" }], // 본 사람
	imgUrl: { type: String }, // 스토리 이미지 url
	createdAt: { type: Date, default: Date.now() }, // 만들어진 시간
	expireAt: { type: Date, index: { expires: "1d" } },
	userName: { type: String }, // 사용자 이름. uuid로 찾아서 작성할 것
	userProfileImgUrl: { type: String }, // 유저 프로필 사진
});

/**
 * @description Story 스키마에 대한 메서드 ( document )
 */
export interface IStorySchema extends IStory, Document {}

/**
 * @description Story 모델에 대한 정적 메서드 ( collection )
 */
export interface IStoryModel extends Model<IStorySchema> {}

export default model<IStorySchema>("Story", StorySchema) as IStoryModel;
