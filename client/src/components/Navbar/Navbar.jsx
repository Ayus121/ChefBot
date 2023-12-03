import React, { useState } from 'react';
import './Navbar.css'; // Your styles go here
import background from '../../assets/pexels-ella-olsson-1640777.jpg'
import SearchBar from '../SearchBar/Searchbar'
import Caraousel from '../Caraousel/Caraousel';

const Navbar = () => {
  const navigationLink = [{ id: 'home', url: '#home', text: 'Home' },
  { id: 'recipes', url: '#recipes', text: 'Recipes' },
  { id: 'about', url: '#about', text: 'About Us' }]
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };
  return (
    <>
      <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>

        <div>
        <i className="bx bx-menu"></i>
        <a className='logo' style={{padding:'10px 12px',background:'orange',borderRadius:'10px',color:"white"}}>TasteBud</a>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Sidebar content goes here */}
        <ul>
          <li>Home</li>
          <li>Ingredients</li>
          <li>Recipes</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        
      </div>
      <div className='header'>
        {/* Add your background image style here */}
        {/* <img src={background} alt="" /> */}
        <div>
        <h1>Type Your Cravings</h1>
        <p>From Pixels and Palates - Where innovation cooks Magic!</p>
        <SearchBar/>
        </div>
      </div>
      {/* <Caraousel className='caraousel'/> */}
    </>
  );
};

export default Navbar;
