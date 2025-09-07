import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,

  // FILL WITH OTHER PROPERTIES OF THE RECIPE

  favorited: [{                               // users that liked the recipe
    type: mongoose.Schema.Types.ObjectId,
  }]
});

const Recipe = mongoose.model(
  "Recipe",
  recipeSchema
);
export default Recipe;
