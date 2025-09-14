import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './SavedRecipes.css';

const backend_url = 'http://localhost:8080'
const FoodImgPlaceholder = "https://orders.goodthymes.ca/assets/img/goodthymes/default-menu-image-placeholder.png";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${backend_url}/userSavedRecipes`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        });

        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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
