import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [{                               // the user's liked recipes
    type: mongoose.Schema.Types.ObjectId,
  }]
});

const User = mongoose.model(
  "User",
  userSchema
);
export default User;
