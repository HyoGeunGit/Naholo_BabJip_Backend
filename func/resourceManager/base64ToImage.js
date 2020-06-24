/**
 * @description base64를 이미지파일로 변환
 * @param base64
 * @returns {imgFile:fileBuffer,imgType:jpeg|png|gif...}
 */
export default function base64ToImage(base64) {
	let splitData = base64.split(",");
	let imgType = null;
	if (splitData.length > 1) {
		imgType = splitData[0].split(";")[0].split("/")[1];
		switch (imgType) {
			case "jpeg":
				imgType = "jpg";
				break;
		}
		base64 = splitData[1];
	}
	let imageBuffer = Buffer.from(base64, "base64");
	return {
		imgFile: imageBuffer,
		imgType: imgType,
	};
}
