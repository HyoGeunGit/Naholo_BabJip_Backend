import mongoose, { Schema } from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupName: { type: String }, // 그룹 이름
  users: [{ type: Schema.Types.ObjectId, ref: "users" }], // 참여자 배열 (user._id 사용)
  lat: { type: String }, // 경도
  lng: { type: String }, // 위도
  startTime: { type: Date }, // 약속 시작 시간
  endTime: { type: Date }, // 약속 종료 시간
  iconnum: { type: Number }, // 음식 아이콘 번호
  food: { type: String }, // 음식 이름
});

export const Groups = mongoose.model("groups", GroupSchema);
