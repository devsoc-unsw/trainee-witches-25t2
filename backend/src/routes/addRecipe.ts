import express, {Request, Response} from "express";
import Recipe from '../models/Recipe'

export const addRecipe = async (req: Request, res: Response) => {
  const { name, ingredients, steps, tags, image } = req.body;

  if (!name || !ingredients || !steps) {
    return res.status(400).json({ message: "Name, ingredients, and steps are required" });
  }

  try {
    const newRecipe = new Recipe({
      name,
      ingredients,
      steps,
      tags: tags || [],
      image: image || null,
      comments: [],
      favorited: []
    });

    await newRecipe.save();
    res.status(201).json({ 
      message: "Recipe added successfully", 
      recipe: newRecipe 
    });

  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Error adding recipe" });
  }
}