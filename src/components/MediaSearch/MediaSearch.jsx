import React from "react";
import "./MediaSearch.css";
import { IoSearchOutline } from "react-icons/io5";

const MediaSearch = () => {
  return (
    <div className="input-wrapper">
      <button className="icon">
        <IoSearchOutline/>
      </button>
      <input placeholder="search.." className="input" name="text" type="text" />
    </div>
  );
};

export default MediaSearch;
