import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const Comment = mongoose.model(
  "Comment",
  commentSchema
);

export default Comment;
