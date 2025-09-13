import './SwipePage.css';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const backend_url = "http://localhost:8080";

const SwipePage = () => {
  const navigate = useNavigate();
  const food = {
    name: "Spaghetti Bolognese",
    ingredientsCount: 8,
  };
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    handleRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      setCurrentRecipe(recipes[currentIndex]);
    }
  }, [recipes, currentIndex]);

  const changeIndex = async (indexMove, liked) => {
    if (indexMove === 1) {
      if (liked) {
        const response = await axios.post(`${backend_url}/auth/addFavorite`, {
          token: localStorage.getItem("token"),
          recipeId: recipes[currentIndex]._id
        });
      }
    }

    let newIndex = indexMove + currentIndex;
    // clamp to valid range
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= recipes.length) newIndex = recipes.length - 1;

    setCurrentIndex(newIndex);
    localStorage.setItem("index", newIndex);
  }

  const handleRecipes = async () => {
    try {
      const response = await axios.get(`${backend_url}/recipes`, {
        withCredentials: true
      });

      setRecipes(response.data || []);

      let index = parseInt(localStorage.getItem("index")) || 0;
      if (!index) {
        localStorage.setItem("index", 0);
        index = 0;
      }
      setCurrentIndex(index);
      
    } catch (error) {
      alert('Recipes failed: ' + JSON.stringify(error.response.data.message));
    }
  }

  return (
    <div 
      className="swipePage-container"
      style={{
        backgroundImage: currentRecipe 
          ? `linear-gradient(to top, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0) 40%), url(${currentRecipe.image})`
          : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 80%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease',
      }}
    >
      <ProfileHeader/>

      {/* Food info */}
      {currentRecipe && (
        <div className="food-info">
          <h1 onClick={() => navigate(`/recipeDetail/${currentRecipe._id}`)} className="food-name">{currentRecipe.name}</h1>
          <p className="food-ingredients">
            <span className="green-circle"></span>
            {currentRecipe?.ingredients?.length || 0} ingredients
          </p>
        </div>
      )}

      {/* Swipe buttons */}
      <div className="swipe-buttons">
        <button onClick={() => changeIndex(-1, false)} className="swipe-btn previous">←</button>
        <button onClick={() => changeIndex(1, false)} className="swipe-btn nope">✕</button>
        <button onClick={() => changeIndex(1, true)} className="swipe-btn next">✓</button>
      </div>

      <ProfileFooter/>
    </div>
  );
};

export default SwipePage;