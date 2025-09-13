import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const recipeSchema = new mongoose.Schema({
  name: String,

  // FILL WITH OTHER PROPERTIES OF THE RECIPE
  imageUrl: String,
  instructions: String,
  ingredients: [ingredientSchema],
  favorited: [{                               // users that liked the recipe
    type: mongoose.Schema.Types.ObjectId,
  }]
});

const Recipe = mongoose.model(
  "Recipe",
  recipeSchema
);
export default Recipe;
