import {
  Routes,
  Route,
} from "react-router-dom";
import './Pages.css';

import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProfilePage from '../ProfilePage/ProfilePage';
import AddRecipe from '../AddRecipe/AddRecipe';
import SwipePage from '../SwipePage/SwipePage';
import RecipePage from '../RecipePage/RecipePage';
import SearchPage from '../SearchPage/SearchPage';
import SavedRecipes from '../SavedRecipes/SavedRecipes';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

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
        
        {/* Protected Routes always redirects to login */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/addRecipe"
          element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/dishcover"
          element={
            <PrivateRoute>
              <SwipePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipeDetail/:id"
          element={
            <PrivateRoute>
              <RecipePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/searchPage"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/savedRecipes"
          element={
            <PrivateRoute>
              <SavedRecipes />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Pages;