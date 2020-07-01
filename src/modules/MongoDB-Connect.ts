import Mongoose from "mongoose";
import User from "../schema/User";
/**
 * @description Mongo DB 관리 클래스
 */
class MongoDBConnect {
	public isDatabaseConnect: boolean = false;
	private db: Mongoose.Connection;

	public readonly env: string = process.env.NODE_ENV || "development"; // 개발 환경
	public readonly dbUri: string = process.env.DB_URI || process.env.MONGODB_URI || "mongodb://localhost/NEM-TEMPLATE-V2"; // DB URL
	/**
	 * @description MongoDB 활성화
	 * @param {string}url MongoDB URL
	 */
	public init(url?: string): void {
		this.db = Mongoose.connection;
		// 접속 실패 시
		this.db.on("error", () => {
			console.log("db connect fail");
			this.isDatabaseConnect = false;
			process.exit();
		});
		// 접속 성공 시
		this.db.once("open", () => {
			console.log("db connect clear");
			this.isDatabaseConnect = true;
		});

		Mongoose.set("useCreateIndex", true);
		Mongoose.set("useUnifiedTopology", true);
		Mongoose.connect(url || this.dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
	}
	/**
	 * @description DB 객체 반환
	 * @returns {Mongoose.Connection} DB 객체
	 */
	public getDB(): Mongoose.Connection {
		return this.db;
	}
}
export default new MongoDBConnect();
