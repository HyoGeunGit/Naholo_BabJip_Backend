import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";
function makeRandomFileName(type) {
	let randomStr = crypto.randomBytes(20).toString("hex");
	console.log(randomStr);
	return `${randomStr}.${type}`;
}
/**
 * @description /public/${filename} 에 file을 저장합니다.
 * @param file 파일 버퍼
 * @param type 파일 확장자
 */
export default async function resourceSave(file, type) {
	let filename = makeRandomFileName(type);
	// file path
	let filepath = path.join("public/", filename);
	try {
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
