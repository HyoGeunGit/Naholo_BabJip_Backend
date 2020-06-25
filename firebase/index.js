import * as admin from "firebase-admin";
var serviceAccount = require("../path/naholo-babjip-firebase-adminsdk-atcf5-757cc90900");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://naholo-babjip.firebaseio.com",
});

export { admin };
// 이 파일 제거 가능하지만 추천 안함
