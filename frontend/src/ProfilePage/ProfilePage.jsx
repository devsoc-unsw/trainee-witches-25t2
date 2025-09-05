import './ProfilePage.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import TextField from '@mui/material/TextField';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';

const ProfilePage = () => {
  return (
    <div id="profile-page">
      <ProfileHeader/>

      <div id="profile-pictureBox">
        <Image id="profile-picture" src="../MainLogo.png" rounded />
        <Button id="profile-upload" variant="danger">Upload Picture</Button>
      </div>

      <div id="profile-editBox">
        <TextField
          label="Name"
          className="profile-nameEmailInput"
          defaultValue="Normal"
          variant="standard"
        />

        <TextField
          label="Email"
          className="profile-nameEmailInput"
          defaultValue="Normal"
          variant="standard"
        />

        <Button id="profile-submitChanges" variant="dark">Submit Changes</Button>
      </div>

      <ProfileFooter/>
    </div>
  );
};

export default ProfilePage;