import './ProfileFooter.css';

const ProfileFooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-icons">
        <img src="../Recipes.png" alt="Recipes logo" className="footer-icon"
        onClick={() => window.location.href = `/dishcover`} />
        <img src="../Profile.png" alt="Profile logo" 
        className="footer-icon"
        onClick={() => window.location.href = `/profile`} />
        <img src="../Favorites.png" alt="Favorites logo" className="footer-icon"
        onClick={() => window.location.href = `/savedRecipes`} />
        <img src="../Add.png" alt="Add recipe logo"
        className="footer-icon"
        onClick={() => window.location.href = `/addRecipe`} />
      </div>
    </footer>
  );
};

export default ProfileFooter;