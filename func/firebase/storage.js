import path from "path";
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../path/gcsKey/Nahollo-Babjip-de7a028d9723.json"
  ),
  projectId: "Nahollo-Babjip",
});

const bucket = gcs.bucket("nahollo-babjip.appspot.com");

export { bucket };
