import * as admin from "firebase-admin";
var serviceAccount = require("../path/testfirebase-63b2b-firebase-adminsdk-q04xu-f46b67c8e1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testfirebase-63b2b.firebaseio.com/",
});

export { admin };
// 이 파일 제거 가능하지만 추천 안함
