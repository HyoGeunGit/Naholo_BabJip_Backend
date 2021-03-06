import base64ToImage from "./base64ToImage";
import saveResource from "./saveResource";
import { getRandomChars } from "../crypto/authenticationCrypto";

/**
 * @description public/profileImage/${uuid}/profile.type 로 프로필파일 저장
 * @param {String}uuid 유저 uuid
 * @param {String}base64 base64 이미지
 * @returns {Promise<String>} 파일 경로
 */
export default async function saveProfileImage(uuid, base64) {
  let imgData = base64ToImage(base64);
  return await saveResource(`profileImage/${uuid}/profile.${imgData.imgType}`, imgData.imgFile);
}
