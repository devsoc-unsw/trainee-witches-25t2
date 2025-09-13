import './ProfileFooter.css';

const ProfileFooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-icons">
        <img src="../Recipes.png" alt="Recipes logo" className="footer-icon" />
        <img src="../Profile.png" alt="Profile logo" className="footer-icon" />
        <img src="../Favorites.png" alt="Favorites logo" className="footer-icon" />
      </div>
    </footer>
  );
};

export default ProfileFooter;