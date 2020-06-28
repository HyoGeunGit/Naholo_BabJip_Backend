import mongoose, { Schema } from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupName: { type: String }, // 그룹 이름
  users: [
    {
      uuid: { type: String },
    },
  ], // 참여자 배열 (user._id 사용)
  maximum: { type: Number }, // 최대 참가자
  lat: { type: String }, // 경도
  lng: { type: String }, // 위도
  vicinity: { type: String }, //주소
  time: { type: String }, // 만날 시간 ex 9시 ~ 10시 ( PM )
  isAdult: { type: Boolean, default: false }, // 19세
  category: { type: String }, // 카테고리
  food: { type: String }, // 음식 이름
});

const OneByOneSchema = new mongoose.Schema({}); // 1 to 1 matching
export const Groups = mongoose.model("groups", GroupSchema);
