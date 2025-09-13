import express, {Request, Response} from "express";
import Recipe from '../models/Recipe';
// import Comment from '../models/Comment';

// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { id } = req.params; // recipeId
  const { user, comment } = req.body;

  if (!comment || !user) {
    return res.status(400).json({ message: "Comment and user s is required" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.comments.unshift({
      user,
      comment
    });

    await recipe.save();

    res.status(201).json({
      message: "Comment added successfully",
      recipe
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
};
