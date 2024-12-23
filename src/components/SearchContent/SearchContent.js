import React from "react";
import { BiSearch } from "react-icons/bi";
import './SearchContent..css'

const SearchContent = () => {
  return (
    <div className="searchContent">
      <BiSearch size={18} className="searchIcon" />
      <input
        type="text"
        placeholder="Search Content"
      />
    </div>
  );
};

export default SearchContent;