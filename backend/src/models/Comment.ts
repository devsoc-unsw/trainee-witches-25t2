import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId},
  comment: String
}, {timestamps: true}); // for createdAt

const Comment = mongoose.model(
  "Comment",
  commentSchema
);
export default Comment;
