import mongoose from "mongoose";
const uri = "mongodb://127.0.0.1:27017/NaholeDBDev";

let db = mongoose.connect(uri, (err) => {
  if (err) console.log(err);
  else {
    console.log("Succesfully Connected DB!");
  }
});

export { Users } from "./Schema/Users";
export { Groups } from "./Schema/Groups";
export { BackupStories, Stories } from "./Schema/Stories";
