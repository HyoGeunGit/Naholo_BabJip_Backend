import path from "path";
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../path/gcsKey/Naholo-Babjip-6a0a4fba2081.json"
  ),
  projectId: "Nahollo-Babjip",
});

const bucket = gcs.bucket("nahollo-babjip.appspot.com");

export { bucket };
