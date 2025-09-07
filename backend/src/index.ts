import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

import routes from "./server"

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // Adjust this to your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


app.use(bodyParser.json({limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be defined in .env");
}

app.use(
  session({
    secret: SESSION_SECRET, // store this in env for production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      secure: false, // true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// Routes
app.use("/", routes);

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined in .env");
}

mongoose.connect(MONGODB_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`)))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unexpected error", error);
    }
  });  
