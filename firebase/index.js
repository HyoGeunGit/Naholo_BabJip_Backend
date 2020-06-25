import * as admin from "firebase-admin";
var serviceAccount = require("../path/nahollo-babjip-firebase-adminsdk-ujxid-688e218164.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nahollo-babjip.firebaseio.com",
  storageBucket: "nahollo-babjip.appspot.com/",
});

export default admin;
// 이 파일 제거 가능하지만 추천 안함
