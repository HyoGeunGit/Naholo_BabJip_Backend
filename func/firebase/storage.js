import path from "path";
import base64ToImage from "../resourceManager/base64ToImage";
import rndString from "randomstring";
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage({
  keyFilename: path.join(__dirname, "../../path/gcsKey/Naholo-Babjip-6a0a4fba2081.json"),
  projectId: "Nahollo-Babjip",
});

const bucket = gcs.bucket("nahollo-babjip.appspot.com");

const config = {
  action: "read",
  expires: "03-17-2025",
};
const useStorage = {
  uploadProfile: async (base64, fileName) => {
    let img = await base64ToImage(base64);
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: true,
      metadata: {
        contentType: img.imgType,
      },
    });
    blobStream.on("error", (err) => {
      console.log(err);
      return err;
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      console.log(publicUrl);
      return publicUrl;
    });

    blobStream.end(img.imgFile);
  },
};

export { useStorage };
