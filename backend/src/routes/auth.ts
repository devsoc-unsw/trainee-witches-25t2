import express, {Request, Response} from "express";
import User from "../models/User";
import Session from "../models/Session";
import bcrypt from "bcrypt-ts";
var randomstring = require("randomstring");

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const token = randomstring.generate();

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      favorites: []
    });
  
    await newUser.save();       // save the new user to the database

    const newSession = new Session({
      userId: newUser._id,
      token
    })

    await newSession.save();    // save the new session to the database

    res.status(200).json({ message: "User registered successfully", token });
  
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
}

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "Email is not registered" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password!);
  if (!isMatch) {
    return res.status(400).json({ message: "Password is incorrect" });
  }
  const token = randomstring.generate();

  try {
    const newSession = new Session({
      userId: existingUser._id,
      token
    })

    await newSession.save();    // save the new session to the database

    res.status(200).json({ message: "User registered successfully", token });
  
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
}

export const logout = async (req: Request, res: Response) => {
  const token = req.header("token");

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const deletedSession = await Session.findOneAndDelete({ token });

    if (!deletedSession) {
      return res.status(400).json({ message: "Invalid session or already logged out" });
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};