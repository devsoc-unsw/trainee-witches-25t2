import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileFooter from '../ProfileFooter/ProfileFooter';
import './SearchPage.css';

const recipes = [
  { id: 1, title: "Simple Baked Pasta with Cheese", img: "https://anoregoncottage.com/wp-content/uploads/2010/02/cheesy-baked-pasta_featured.jpg"},
  { id: 2, title: "Three Cheese Italian Pasta Bake", img: "https://ohsodelicioso.com/wp-content/uploads/2021/03/threecheeseitalianpenne-8.jpg"},
  { id: 3, title: "Cream Cheese Pasta", img: "https://cookdinnertonight.com/wp-content/uploads/2024/02/Cream-Cheese-Pasta-25-1200.jpg"},
  { id: 4, title: "Creamy Cheesy Chicken Pasta", img: "https://veenaazmanov.com/wp-content/uploads/2020/01/Chicken-Breast-Pasta-Recipe6.jpg"},
  { id: 5, title: "Wagyu Beef Pasta", img: "https://www.recipetineats.com/tachyon/2017/07/Beef-Ragu-11a.jpg?resize=964%2C1350&zoom=1"},
  { id: 6, title: "Blue Cheese Pasta", img: "https://i2.wp.com/lifecurrentsblog.com/wp-content/uploads/2019/01/MG_0246.jpg"},
];

const SearchPage = () => {
  return (
    <div className="search-page">
      <ProfileHeader />

      <div className="search-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      
      <p>70 Recipes</p>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.img} alt={recipe.title} className="recipe-img" />
            <div className="recipe-info">
              <p>{recipe.title}</p>
            </div>
          </div>
        ))}
      </div>

      <ProfileFooter />
    </div>
  );
};

export default SearchPage;
