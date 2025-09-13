import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,

  // FILL WITH OTHER PROPERTIES OF THE RECIPE
  image: String,
  ingredients: [{
    type: String
  }],
  steps: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  favorited: [{                               // users that liked the recipe
    type: mongoose.Schema.Types.ObjectId,
  }]
}, {timestamps: true}); // for createdAt

const Recipe = mongoose.model(
  "Recipe",
  recipeSchema
);
export default Recipe;
