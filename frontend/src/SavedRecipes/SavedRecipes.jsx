import React from "react";
import './SavedRecipes.css';

const recipes = [
  { id: 1, title: "", img: ""},
  { id: 2, title: "", img: ""},
  { id: 3, title: "", img: ""},
  { id: 4, title: "", img: ""},
  { id: 5, title: "", img: ""},
  { id: 6, title: "", img: ""},
];

const SavedRecipes = () => {
  return (
    <div className="saved-page">
      <h1 className="saved-title">Saved Recipes</h1>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.img} alt={recipe.title} className="recipe-img" />
            <div className="recipe-info">
              <p>{recipe.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* bottom navigation bar */}
      <div className="bottom-nav">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  );
};

export default SavedRecipes;
