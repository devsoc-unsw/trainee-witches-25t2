import React, { useState, useEffect } from 'react';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './SavedRecipes.css';

// const recipes = [
//   { id: 1, title: "Simple Baked Pasta with Cheese", img: "https://anoregoncottage.com/wp-content/uploads/2010/02/cheesy-baked-pasta_featured.jpg"},
//   { id: 2, title: "Three Cheese Italian Pasta Bake", img: "https://ohsodelicioso.com/wp-content/uploads/2021/03/threecheeseitalianpenne-8.jpg"},
//   { id: 3, title: "Cream Cheese Pasta", img: "https://cookdinnertonight.com/wp-content/uploads/2024/02/Cream-Cheese-Pasta-25-1200.jpg"},
//   { id: 4, title: "Creamy Cheesy Chicken Pasta", img: "https://veenaazmanov.com/wp-content/uploads/2020/01/Chicken-Breast-Pasta-Recipe6.jpg"},
//   { id: 5, title: "Wagyu Beef Pasta", img: "https://www.recipetineats.com/tachyon/2017/07/Beef-Ragu-11a.jpg?resize=964%2C1350&zoom=1"},
//   { id: 6, title: "Blue Cheese Pasta", img: "https://i2.wp.com/lifecurrentsblog.com/wp-content/uploads/2019/01/MG_0246.jpg"},
// ];

const FoodImgPlaceholder = "https://orders.goodthymes.ca/assets/img/goodthymes/default-menu-image-placeholder.png";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`http://localhost:8080/recipes`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  });

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipes) return <p>No recipe found</p>;

  return (
    <div className="saved-page">
      <h1 className="saved-title">Saved Recipes</h1>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card" onClick={()=> {window.location.href=`/recipeDetail/${recipe._id}`}}>
            <img src={recipe.image || FoodImgPlaceholder} alt={recipe.name} className="recipe-img" />
            <div className="recipe-info">
              <p>{recipe.name}</p>
            </div>
          </div>
        ))}
      </div>

      <ProfileFooter />
    </div>
  );
};

export default SavedRecipes;
