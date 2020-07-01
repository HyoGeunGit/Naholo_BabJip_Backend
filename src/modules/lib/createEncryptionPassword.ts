import { IUserModel } from "../../schema/User";

import crypto from "crypto";

export interface EncryptionPassword {
	passwd: string;
	salt: string;
}
export default async function (password: string, salt?: string): Promise<EncryptionPassword> {
	try {
		let data: EncryptionPassword = {
			passwd: "",
			salt: salt || "",
		};
		data.salt = data.salt || (await crypto.randomBytes(64).toString("base64"));
		data.passwd = crypto.pbkdf2Sync(password, data.salt, 10000, 64, "sha512").toString("base64");
		return data;
	} catch (err) {
		throw err;
	}
}
