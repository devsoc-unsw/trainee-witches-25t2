import express, {Request, Response} from "express";

import {
  register,
  login,
  logout
} from "./routes/auth";

import {
  addRecipe
} from "./routes/addRecipe";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Dishcovery");
})

app.post("/auth/register", register);
app.post("/auth/login", login);
app.delete("/auth/logout", logout);

app.post("/recipe/add", addRecipe);

export default app;