import express, {Request, Response} from "express";
import Recipe from '../models/Recipe';
import User from '../models/User';
import Session from "../models/Session";

export const getUserSavedRecipes = async (req: Request, res: Response) => {
  const token = req.header("token");

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.favorites || user.favorites.length === 0) {
      return res.status(200).json([]); 
    }

    const recipes = await Recipe.find({ _id: { $in: user.favorites } });
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching favourite recipes:", error);
    return res.status(500).json({ message: "Error fetching favourite recipes" });
  }
};
