import express, {Request, Response} from "express";

import {
  register
} from "./routes/auth";

import {
  addRecipe
} from "./routes/addRecipe";

import { 
  getRecipeById,
  getAllRecipes
} from "./routes/recipeDetails";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Dishcovery");
})

app.post("/auth/register", register);
app.post("/recipe/add", addRecipe);
app.get("/recipes/:id", getRecipeById);
app.get("/recipes", getAllRecipes);

export default app;