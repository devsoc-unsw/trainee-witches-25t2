
import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import CommentsSection from "../components/ui/Comments-section";
import { useParams } from 'react-router-dom';

const ProfilePicPlaceholder = "https://media.istockphoto.com/id/1267173093/photo/woman-mixing-ingredients-and-vegetables-in-pan-while-preparing-lunch.jpg?s=612x612&w=0&k=20&c=JvA2vsFF7feEYvHnr79FNvZq1hEd1-evnUniaVwMCZg=";
const FoodImgPlaceholder = "https://orders.goodthymes.ca/assets/img/goodthymes/default-menu-image-placeholder.png";

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
        console.log("test");
        console.log(recipe);
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:8080/recipes/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: "You", // TODO: replace 'user' in the comment schema to be a reference to a user instead of a string !!!!!!!!!!!
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
        <button className="back-button" onClick={()=> {window.location.href=`/dishcover`}}>←</button>
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
        <button className="save-button">🔖 Save</button>
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
