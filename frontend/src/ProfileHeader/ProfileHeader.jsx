import './ProfileHeader.css';
import Button from 'react-bootstrap/Button';

const ProfileHeader = () => {
  return (
    <header className="header-container">
      <div className="header-left">
        <img
          src="../MainLogo.png"
          alt="Dishcovery logo"
          className="header-logo"
        />
        <span className="header-title">DISHCOVERY</span>
      </div>
      
      <div className="header-right">
        <Button className="saved-recipes-button">Saved recipes</Button>
      </div>
    </header>
  );
};

export default ProfileHeader;