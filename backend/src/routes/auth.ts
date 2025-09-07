import express, {Request, Response} from "express";
import User from "../models/User";
import bcrypt from "bcrypt-ts";

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

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      favorites: []
    });

    await newUser.save();     // save the new user to the database
    res.status(200).json({ message: "User registered successfully" });
  
  } catch (error) {
    res.status(400).json({ message: "Error registering user" });
  }
}