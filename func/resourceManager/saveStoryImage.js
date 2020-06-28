import base64ToImage from "./base64ToImage";
import saveResource from "./saveResource";
import { getRandomChars } from "../crypto/authenticationCrypto";

/**
 * @description public/profileImage/${uuid}/profile.type 로 프로필파일 저장
 * @param {String}useruuid 유저 uuid
 * @param {String}storyuuid 스토리 uuid
 * @param {Array}base64List base64 이미지 문자 배열
 * @returns {Promise<Array>} 파일 경로 배열
 */
export default async function saveStoryImage(useruuid, storyuuid, base64List) {
  let result = [];
  for (let idx in base64List) {
    let imgData = base64ToImage(base64List[idx]);
    result.push(await saveResource(`story/${useruuid}/${storyuuid}/${idx}.${imgData.imgType}`, imgData.imgFile));
  }
  return result;
}
