import './SwipePage.css';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';

const SwipePage = () => {
  const food = {
    name: "Spaghetti Bolognese",
    ingredientsCount: 8,
  };

  return (
    <div className="swipePage-container">
      <ProfileHeader/>

      {/* Food info */}
      <div className="food-info">
        <h1 className="food-name">{food.name}</h1>
        <p className="food-ingredients">
          <span className="green-circle"></span>
          {food.ingredientsCount} ingredients
        </p>
      </div>

      {/* Swipe buttons */}
      <div className="swipe-buttons">
        <button className="swipe-btn previous">←</button>
        <button className="swipe-btn nope">✕</button>
        <button className="swipe-btn next">✓</button>
      </div>


      <ProfileFooter/>
    </div>
  );
};

export default SwipePage;