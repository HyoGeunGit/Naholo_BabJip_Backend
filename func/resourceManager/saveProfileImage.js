import base64ToImage from "./base64ToImage";
import saveResource from "./saveResource";
import { getRandomChars } from "../crypto/authenticationCrypto";

/**
 * @description public/${uuid}/profileImage/
 * @param {String}uuid 유저 uuid
 * @param {String}base64 base64 이미지
 * @returns {String} 파일 경로
 */
export default async function saveProfileImage(uuid, base64) {
  let imgData = base64ToImage(base64);
  return await saveResource(`profileImage/${uuid}/${getRandomChars(10)}.${imgData.imgType}`, imgData.imgFile);
}
