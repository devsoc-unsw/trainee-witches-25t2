
import React, { useState } from 'react';
import './RecipePage.css';
import CommentsSection from "../components/ui/Comments-section";

const ProfilePicPlaceholder = "https://media.istockphoto.com/id/1267173093/photo/woman-mixing-ingredients-and-vegetables-in-pan-while-preparing-lunch.jpg?s=612x612&w=0&k=20&c=JvA2vsFF7feEYvHnr79FNvZq1hEd1-evnUniaVwMCZg=";
const FoodImgPlaceholder = "https://www.foodandwine.com/thmb/2gSJpmOtwc2vIub8-5TSJ-_IuHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-with-sausage-mustard-and-basil-XL-RECIPE0918-1bd7075faf664e198ff1f5375012e12c.jpg";

const RecipePage = () => {
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
  const recipe = {
    title: "Sausage Pasta with Basil and Mustard",
    author: "Jane Doe",
    date: "July 24, 2025",
    image: FoodImgPlaceholder,
    ingredients: [
      "1 pound penne, rigatoni, or medium shells",
      "1 tablespoon extra-virgin olive oil",
      "8 hot Italian sausages, meat removed from casings and crumbled (about 1 1/2 pounds)",
      "3/4 cup dry white wine",
      "3/4 cup heavy cream",
      "3 tablespoons grainy mustard",
      "Pinch of crushed red pepper",
      "1 cup thinly sliced basil"
    ],
    instructions: [
      "Cook the pasta in a large pot of boiling salted water until al dente and then drain.",
      "Meanwhile, heat the olive oil in a large, deep skillet. Add the sausage meat and brown over moderately high heat, about 5 minutes.",
      "Add the wine and simmer, scraping up the browned bits from the bottom, until reduced by half, about 5 minutes.",
      "Add the cream, mustard, and crushed red pepper and simmer for 2 minutes.",
      "Remove the skillet from the heat, add the pasta and basil, and toss to coat.",
      "Serve while hot."
    ]
  };

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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1, // ?? uncertain
        user: "You",
        text: newComment,
        timestamp: "Just now"
      };
      setComments([...comments, comment]); // add new comment to existing comments
      setNewComment(''); // clear input field
    }
  };

  return (
    <div className="recipe-page">
      {/* header */}
      <header className="recipe-header">
        <button className="back-button">←</button>
        <div className="recipe-hero">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <div className="recipe-title-overlay">
            <h1 className="recipe-title">{recipe.title}</h1>
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
                  <p className="recipe-date">{recipe.date}</p>
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

        {/* instructions */}
        <section className="instructions-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">
                {instruction}
              </li>
            ))}
          </ol>
        </section>

        {/* comments section */}
        <CommentsSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </main>
    </div>
  );
};

export default RecipePage;
