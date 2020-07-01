import { Model, Schema, Document, model, HookNextFunction, Mongoose } from "mongoose";
import { ObjectID } from "bson";
import createEncryptionPassword from "../modules/lib/createEncryptionPassword";

export interface IUser {
	// 암호화 필수
	userid: string; // id 값
	passwd: string; // 비밀번호.
	salt: string; // 해시 키값
	phone: string; // 전화번호
	birth: string; // 생일
	email: string; // 이메일
	nick: string; // 닉네임
	name: string; // 이름
	sex: boolean; // 성별 false 여, true 남
	termsChk: boolean; // 약관 동의
	eventChk: boolean; // 이벤트 동의
	profileImgUrl: string;
	social: string; // facebook, google, kakao
	groups: ObjectID; // FIXME: Group 연결
}
export const UserSchema: Schema = new Schema({
	// 암호화 필수
	userid: { type: String, unique: true }, // id 값
	passwd: { type: String, select: false }, // 비밀번호.
	salt: { type: String, select: false }, // 해시 키값
	phone: { type: String, unique: true }, // 전화번호
	birth: { type: String }, // 생일
	email: { type: String, unique: true }, // 이메일
	nick: { type: String, unique: true }, // 닉네임
	name: { type: String }, // 이름
	sex: { type: Boolean }, // 성별 false 여, true 남
	termsChk: { type: Boolean, default: false }, // 약관 동의
	eventChk: { type: Boolean, default: false }, // 이벤트 동의
	profileImgUrl: { type: String, default: false },
	social: { type: String }, // facebook, google, kakao
	groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
});
const NonUpdatableField = ["userid", "passwd", "phone", "email", "nick"];

/**
 * @description User 스키마에 대한 메서드 ( document )
 */
export interface IUserSchema extends IUser, Document {
	checkPassword(passwd: string): Promise<boolean>;
}

/**
 * @description User 모델에 대한 정적 메서드 ( collection )
 */
export interface IUserModel extends Model<IUserSchema> {}

UserSchema.methods.checkPassword = async function (this: IUserSchema, passwd: string): Promise<boolean> {
	return (await createEncryptionPassword(passwd, this.salt)).passwd == this.passwd;
};

UserSchema.pre("save", async function (this: IUserSchema) {
	if (this.isNew) {
		let data = await createEncryptionPassword(this.passwd);
		this.passwd = data.passwd;
		this.salt = data.salt;
	}
	return this;
});

export default model<IUserSchema>("User", UserSchema) as IUserModel;
