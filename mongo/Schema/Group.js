import mongoose, { Schema } from "mongoose";

const GroupSchema = new mongoose.Schema({
	groupName: { type: String },
	users: [{ type: Schema.Types.ObjectId, ref: "users" }],
	lat: { type: String },
	lng: { type: String },
	time: { type: Date },
	iconnum: { type: Number },
	food: { type: String },
});

export const Groups = mongoose.model("groups", GroupSchema);
