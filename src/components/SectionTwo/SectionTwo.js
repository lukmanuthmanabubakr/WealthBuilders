import React from "react";
import "./SectionTwo.css";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers, FaGlobeAmericas } from "react-icons/fa";

const SectionTwo = () => {
  return (
    <div className="sectionTwo">
      <h1>WealthBuilders is trusted by global users</h1>
      <p className="providing">
        We are providing secure and easy crypto wallet service among 200+
        countries and regions around the world
      </p>
      <div className="founderCon" data-aos="fade-up" data-aos-duration="2000">
        <div className="eachCon">
          <BsBuildingsFill className="sectionTwoIcon" />
          <p>Found In</p>
          <p>2018</p>
        </div>
        <div className="eachCon">
          <FaUsers className="sectionTwoIcon" />
          <p>Serving users</p>
          <p>25M+</p>
        </div>
        <div className="eachCon">
          <FaGlobeAmericas className="sectionTwoIcon" />
          <p>Supporting countries and regions</p>
          <p>200+</p>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
