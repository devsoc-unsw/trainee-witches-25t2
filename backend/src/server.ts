import express, {Request, Response} from "express";

import {
  register,
  login,
  logout
} from "./routes/auth";

import {
  addRecipe
} from "./routes/addRecipe";

import { 
  getRecipeById,
  getAllRecipes,
  addComment
} from "./routes/recipeDetails";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Dishcovery");
})

app.post("/auth/register", register);
app.post("/auth/login", login);
app.delete("/auth/logout", logout);

app.post("/recipe/add", addRecipe);
app.get("/recipes/:id", getRecipeById);
app.get("/recipes", getAllRecipes);
app.post("/recipes/:id/comments", addComment);

export default app;