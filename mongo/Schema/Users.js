import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  // 암호화 필수
  id: { type: String, unique: true }, // id 값
  passwd: { type: String }, // 비밀번호.
  phone: { type: String, unique: true }, // 전화번호
  birth: { type: String }, // 생일
  email: { type: String, unique: true }, // 이메일
  nick: { type: String, unique: true }, // 닉네임
  sex: { type: Boolean }, // 성별 false 여, true 남
  token: { type: String }, // 토큰. 로그인 시 재발급
});

export const Users = mongoose.model("users", UserSchema);
