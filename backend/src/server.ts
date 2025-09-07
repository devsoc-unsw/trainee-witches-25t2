import express, {Request, Response} from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Dishcovery");
})

export default app;