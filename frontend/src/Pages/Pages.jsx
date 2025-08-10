import {
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProfilePage from '../ProfilePage/ProfilePage';
import AddRecipe from '../AddRecipe/AddRecipe';
import SwipePage from '../SwipePage/SwipePage';
import RecipePage from '../RecipePage/RecipePage';

const Pages = () => {
  return (
    <div>
      {/* This is how the routing/page links work */}
      {/* So if you edit the link (eg. add /register), it will take you to the Register page */}
      {/* These should be all the pages you need, but if you need more just add them here */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/dishcover" element={<SwipePage />} />
        <Route path="/recipeDetail/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
};

export default Pages;