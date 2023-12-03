import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/Searchbar";

const IngredientDetailPage = ()=>{
    const navigationLink = [{ id: 'home', url: '#home', text: 'Home' },
    { id: 'recipes', url: '#recipes', text: 'Recipes' },
    { id: 'about', url: '#about', text: 'About Us' }]
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
    // const handleSearch = (searchTerm) => {
    //   // Implement your search logic here
    //   console.log('Searching for:', searchTerm);
    // };

const recipesDataArray = {
    "recipes": [
      {
        "id": 1,
        "name": "Easy Tomato Basil Pasta",
        "category": "10 Ingredients or Less",
        "ingredients": [
          "200g spaghetti",
          "2 cups cherry tomatoes, halved",
          "3 cloves garlic, minced",
          "1/4 cup extra virgin olive oil",
          "1/4 cup fresh basil, chopped",
          "Salt and pepper to taste",
          "Grated Parmesan cheese for topping"
        ],
        "instructions": [
          "Cook spaghetti according to package instructions.",
          "In a pan, sauté garlic in olive oil until fragrant.",
          "Add cherry tomatoes and cook until softened.",
          "Toss cooked spaghetti with the tomato mixture.",
          "Season with salt and pepper, top with fresh basil and Parmesan cheese."
        ],
        "time": "20 minutes"
      },
      {
        "id": 2,
        "name": "Grilled Lemon Herb Chicken",
        "category": "30 Minutes or Less",
        "ingredients": [
          "4 boneless, skinless chicken breasts",
          "Juice of 2 lemons",
          "2 tablespoons olive oil",
          "2 cloves garlic, minced",
          "1 teaspoon dried oregano",
          "1 teaspoon dried thyme",
          "Salt and pepper to taste",
          "Fresh parsley for garnish"
        ],
        "instructions": [
          "Preheat grill to medium-high heat.",
          "In a bowl, whisk together lemon juice, olive oil, garlic, oregano, thyme, salt, and pepper.",
          "Marinate chicken breasts in the mixture for 10 minutes.",
          "Grill chicken for 6-7 minutes per side or until fully cooked.",
          "Garnish with fresh parsley before serving."
        ],
        "time": "30 minutes"
      },
      {
        "id": 3,
        "name": "Quinoa Salad with Avocado and Cherry Tomatoes",
        "category": "Fresh Picks",
        "ingredients": [
          "1 cup quinoa, cooked and cooled",
          "1 avocado, diced",
          "1 cup cherry tomatoes, halved",
          "1/2 cucumber, diced",
          "1/4 cup red onion, finely chopped",
          "2 tablespoons fresh lemon juice",
          "3 tablespoons extra virgin olive oil",
          "Salt and pepper to taste",
          "Fresh cilantro for garnish"
        ],
        "instructions": [
          "In a large bowl, combine quinoa, avocado, cherry tomatoes, cucumber, and red onion.",
          "In a small bowl, whisk together lemon juice, olive oil, salt, and pepper.",
          "Pour the dressing over the salad and toss to combine.",
          "Garnish with fresh cilantro before serving."
        ],
        "time": "15 minutes"
      }
    ]
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [data, setData] = useState(recipesDataArray);
  const checkIfRecipeIsFresh = (recipeDate) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
    // Assuming recipeDate is a Date object
    return recipeDate >= oneWeekAgo;
  };
  
  const handleSearch = () => {
    let results = data;

    if (searchTerm !== "") {
      results = results.filter(
        (recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter === "10 Ingredients or less recipes") {
      results = results.filter((recipe) => recipe.ingredients.length <= 10);
    } 
    else if (selectedFilter === "30 mins or less recipes") {
      results = results.filter((recipe) => recipe.time <= 30);
    } 
    else if (selectedFilter === "Fresh picks recipes") {
      results = results.filter((recipe) => checkIfRecipeIsFresh(recipe.date));
    }
    
    console.log("Results:", results);
  };
// Maybe you a data array of recipes

    return (
      <>
        <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
  
          <div>
          <i className="bx bx-menu"></i>
          <a className='logo'>Logo</a>
          </div>
        </div>
  
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          {/* Sidebar content goes here */}
          <ul>
            <li>Home</li>
          </ul>
        </div>
        <div className='header'>
          {/* Add your background image style here */}
          {/* <img src={background} alt="" /> */}
          <div>
          <h1>Type Your Cravings</h1>
          <p>From Pixels and Palates - Where innovation cooks Magic!</p>
          <SearchBar/>
          <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="10 Ingredients or less recipes">
          10 Ingredients or less recipes
        </option>
        <option value="30 mins or less recipes">30 mins or less recipes</option>
        <option value="Fresh picks recipes">Fresh picks recipes</option>
      </select>

      <button onClick={() => handleSearch()}>Search</button>
    </div>
          </div>
        
        {/* <Caraousel className='caraousel'/> */}
      </>
    );
}
export default IngredientDetailPage
