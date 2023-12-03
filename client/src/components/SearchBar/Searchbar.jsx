import React, { useState } from 'react';
import './SearchBar.css' 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search term: '+searchTerm);
    // onSearch(searchTerm);
  };

  return (
    <div className='search-container'>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
        </div>
  );
};

export default SearchBar;
