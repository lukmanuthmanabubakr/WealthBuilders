import React from "react";
import { BiSearch } from "react-icons/bi";
import './Search.css'

const Search = ({ value, onChange }) => {
  return (
    <div className="searchContainer">
      <BiSearch size={18} className="searchIcon" />
      <input
        type="text"
        placeholder="Search Users"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;