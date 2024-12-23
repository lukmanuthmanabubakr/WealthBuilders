import React from "react";
import { BiSearch } from "react-icons/bi";
import './NavSearch.css'

const NavSearch = () => {
  return (
    <div className="navbarSearch">
      <BiSearch size={18} className="searchIcon" />
      <input
        type="text"
        placeholder="Search Users"
      />
    </div>
  );
};

export default NavSearch;