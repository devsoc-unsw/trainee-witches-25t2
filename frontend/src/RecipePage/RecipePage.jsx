
import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import CommentsSection from "../components/ui/Comments-section";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePicPlaceholder = "https://media.istockphoto.com/id/1267173093/photo/woman-mixing-ingredients-and-vegetables-in-pan-while-preparing-lunch.jpg?s=612x612&w=0&k=20&c=JvA2vsFF7feEYvHnr79FNvZq1hEd1-evnUniaVwMCZg=";
const FoodImgPlaceholder = "https://orders.goodthymes.ca/assets/img/goodthymes/default-menu-image-placeholder.png";
// const FoodImgPlaceholder = "https://www.foodandwine.com/thmb/2gSJpmOtwc2vIub8-5TSJ-_IuHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-with-sausage-mustard-and-basil-XL-RECIPE0918-1bd7075faf664e198ff1f5375012e12c.jpg";

const backend_url = "http://localhost:8080";

const RecipePage = () => {
  const {id} = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/recipes/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const [likes, setLikes] = useState(121);
  const [isLiked, setIsLiked] = useState(false); // Track if user has liked
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "FoodLover23",
      text: "Loved this recipe! I found that using a different type of pasta was better for balablablablablashfinfwb",
      timestamp: "2 hours ago"
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // Placeholder for recipe data
  // const recipe = {
  //   title: "Sausage Pasta with Basil and Mustard",
  //   author: "Jane Doe",
  //   date: "July 24, 2025",
  //   image: FoodImgPlaceholder,
  //   ingredients: [
  //     "1 pound penne, rigatoni, or medium shells",
  //     "1 tablespoon extra-virgin olive oil",
  //     "8 hot Italian sausages, meat removed from casings and crumbled (about 1 1/2 pounds)",
  //     "3/4 cup dry white wine",
  //     "3/4 cup heavy cream",
  //     "3 tablespoons grainy mustard",
  //     "Pinch of crushed red pepper",
  //     "1 cup thinly sliced basil"
  //   ],
  //   instructions: [
  //     "Cook the pasta in a large pot of boiling salted water until al dente and then drain.",
  //     "Meanwhile, heat the olive oil in a large, deep skillet. Add the sausage meat and brown over moderately high heat, about 5 minutes.",
  //     "Add the wine and simmer, scraping up the browned bits from the bottom, until reduced by half, about 5 minutes.",
  //     "Add the cream, mustard, and crushed red pepper and simmer for 2 minutes.",
  //     "Remove the skillet from the heat, add the pasta and basil, and toss to coat.",
  //     "Serve while hot."
  //   ]
  // };

  // Function to handle liking/unliking a post
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  // const handleAddComment = (e) => {
  //   e.preventDefault();
  //   if (newComment.trim()) {
  //     const comment = {
  //       id: comments.length + 1, // ?? uncertain
  //       user: "You",
  //       text: newComment,
  //       timestamp: "Just now"
  //     };
  //     setComments([comment, ...comments]); // add new comment to existing comments
  //     setNewComment(''); // clear input field
  //   }
  // };

  const addFavorite = async () => {
    const response = await axios.post(`${backend_url}/auth/addFavorite`, {
      token: localStorage.getItem("token"),
      recipeId: recipe._id
    });
  }


  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const userName = await axios.get(`${backend_url}/auth/getName`, {
        headers: {
          token: localStorage.getItem("token")
        },
      });

      const res = await fetch(`http://localhost:8080/recipes/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: userName.data.name,
          comment: newComment
        })
      });

      if (!res.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await res.json();
      setRecipe(data.recipe); // ✅ update recipe (includes updated comments)
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found</p>;

  return (
    <div className="recipe-page">
      {/* header */}
      <header className="recipe-header">
        <button className="back-button">←</button>
        <div className="recipe-hero">
          <img src={recipe.image || FoodImgPlaceholder } alt={recipe.name} className="recipe-image" />
          <div className="recipe-title-overlay">
            <h1 className="recipe-title">{recipe.name}</h1>
            <div className="recipe-meta">
              <span 
                className={`likes-count ${isLiked ? 'liked' : ''}`} 
                onClick={handleLike}
                style={{ cursor: 'pointer' }}
              >
                {likes} <span className="arrow">{isLiked ? '⬆' : '⬆'}</span>
              </span>
              <div className="author-info">
                <img src={ProfilePicPlaceholder} alt={recipe.author} className="author-pfp" />
                <div>
                  <p className="author-name">{recipe.author}</p>
                  <p className="recipe-date">{formatDate(recipe.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* action bar */}
      <div className="action-bar">
        <button className="share-button">📤 Share</button>
        <button onClick={addFavorite} className="save-button">🔖 Save</button>
      </div>

      {/* main content */}
      <main className="recipe-content">
        {/* ingredients */}
        <section className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                • {ingredient}
              </li>
            ))}
          </ul>
        </section>
        <hr />
        {/* instructions */}
        <section className="instructions-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.steps.map((instruction, index) => (
              <li key={index} className="instruction-item">
                {instruction}
              </li>
            ))}
          </ol>
        </section>
        <hr />
        {/* comments section */}
        <CommentsSection
          comments={recipe.comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </main>
    </div>
  );
};

export default RecipePage;
