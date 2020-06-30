import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import Router from "./router";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(cors()); // CORS 설정 미들웨어 ( 추후 설정 )
app.use(helmet()); // 보안 미들웨어
app.use(compression()); // 데이터 압축 미들웨어

app.use(express.static("public")); // public 폴더의 파일을 제공함
app.use(express.urlencoded({ limit: "20mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "20mb" })); // json 지원

const server = app.listen(port, () => {
	// 서버가 열렸을 시 콜백
	console.log(`port : ${port}`);
});

app.use(Router); // 라우터 연결
app.use((req, res, next, err) => {
	res.send("ERR");
}); // 에러 핸들링 TODO: 자세히 작성해야함
