import path, { dirname } from "path";
import { promises as fs } from "fs";
import mkdirp from "mkdirp";

/**
 * @description /public/${filename} 에 file을 저장합니다.
 * @param {String}filename 파일 이름 또는 경로
 * @param {Buffer}file 파일 버퍼
 * @return {String} 파일 경로
 */
export default async function saveResource(filename, file) {
  // file path
  let filepath = path.join("public", filename);
  try {
    let mkdirResult = await mkdirp(path.dirname(filepath));
    // 파일 상태
    let tFile = await fs.stat(filepath);
    // 파일이 있으면
    if (tFile.isFile()) {
      // 파일 삭제
      await fs.unlink(filepath);
    }
  } catch (err) {}
  try {
    // 파일 쓰기
    await fs.writeFile(filepath, file);
    // 파일 경로 반환
    return filename;
  } catch (err) {
    throw err;
  }
}
