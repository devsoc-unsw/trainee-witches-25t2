import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId}, // TODO: get logged in user later skibidi gyatt
  user: String,
  comment: String
}, {timestamps: true}); // for createdAt

const Comment = mongoose.model(
  "Comment",
  commentSchema
);
export default Comment;
