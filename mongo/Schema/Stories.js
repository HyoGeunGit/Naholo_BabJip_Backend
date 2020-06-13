import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  userUUID: { type: String }, // 유저 uuid
  alreadyWatch: [{ userUUID: { type: String } }], // 본 사람
  imgUrl: { type: String }, // 스토리 이미지 url
  createdAt: { type: String, expires: 5 }, // 만들어진 시간
  userName: { type: String }, // 사용자 이름. uuid로 찾아서 작성할 것
  userProfileImgUrl: { type: String }, // 유저 프로필 사진
});
const BackupStorySchema = new mongoose.Schema({
  userUUID: { type: String }, // 유저 uuid
  alreadyWatch: [{ userUUID: { type: String } }], // 본 사람
  imgUrl: { type: String }, // 스토리 이미지 url
  createdAt: { type: String }, // 만들어진 시간
  userName: { type: String }, // 사용자 이름. uuid로 찾아서 작성할 것
  userProfileImgUrl: { type: String }, // 유저 프로필 사진
});

export const Stories = mongoose.model("stories", StorySchema);
export const BackupStories = mongoose.model("backupstories", BackupStorySchema);
