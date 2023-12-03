// RecipeList.js
import React from 'react';
import './RecipeListPage.css';

const RecipeListPage = () => {
  const recipes = [
    { 
      name: 'Recipe 1', 
      image: 'url-to-image-1.jpg' 
    }, 
    { 
      name: 'Recipe 2', 
      image: 'url-to-image-2.jpg'
    }, 
    { 
        name: 'Recipe 3', 
        image: 'url-to-image-3.jpg'
      }, 
    // More recipes here...
  ];
  
  return (
    <>
    <div className="recipe-list-container">
    <div className="recipe-list">
      {recipes.map((recipe, i) =>
        <li key={i} className="recipe-item">
          <img src={recipe.image} alt={recipe.name} className="recipe-image"/>
          <p>{recipe.name}</p>
          <button className="recipe-button">View Recipe</button>
        </li>
      )}
    </div>
    </div>
    </>
  )
};

export default RecipeListPage;
