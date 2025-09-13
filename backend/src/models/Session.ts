import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: String,
  token: { type: String, unique: true }
});

const Session = mongoose.model(
  "Session",
  sessionSchema
);
export default Session;
