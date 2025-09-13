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

export const addFavorite = async (req: Request, res: Response) => {
  const {token, recipeId} = req.body;

  if (!token || !recipeId) {
    return res.status(400).json({ message: "Token and recipeId are required" });
  }

  try {
    // Find the session by token
    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find the user associated with the session
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Add recipeId to favorites if not already added
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    return res.status(200).json({ message: "Recipe added to favorites", favorites: user.favorites });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding favorite" });
  }
}