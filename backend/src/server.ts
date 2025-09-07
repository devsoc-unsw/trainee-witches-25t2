import express, {Request, Response} from "express";

import {
  register
} from "./routes/auth";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Dishcovery");
})

export default app;
app.post("/auth/register", register);