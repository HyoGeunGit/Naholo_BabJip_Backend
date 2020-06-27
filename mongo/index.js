import mongoose from "mongoose";
const uri = "mongodb://127.0.0.1:27017/NaholeDBDev3";

let db = mongoose.connect(uri, (err) => {
  if (err) console.log(err);
  else {
    console.log("Succesfully Connected DB!");
  }
});

export { Users } from "./Schema/Users";
export { BackupStories, Stories } from "./Schema/Stories";
