import React, { useEffect, useState } from "react";
// import {Route,Routes} from 'react-router-dom';
import './App.css';
import Section1 from "./Pages/Section1/Section1";
import ChefBot from './components/Chefbot/ChefBot'
import Header from './components/Header/Header'
import IngredientDetailPage from "./components/IngredientsDeatilPage/IngredientsDeatilPage";
import RecipeData from './data/RecipeData'
import RecipeDetailPage from "./components/RecipeDetailsPage/RecipeDetailsPage";
import { Route, Routes } from "react-router-dom";

const App = ()=>{
    const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("https://tastebud-f2442dbc5186.herokuapp.com/chatbot")
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []); 
    
    console.log(data);
    return(
        <>
             {/* <Navbar/> */}
            <Header/>
             <Routes>
                <Route path="/" element={<IngredientDetailPage/>}></Route>
             </Routes>
            <Section1/>
            <ChefBot/>
            {/* <IngredientDetailPage/> */}
            {/* <RecipeDetailPage/> */}
        </>
    );
}
export default App;
