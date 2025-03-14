import React from 'react';
import forum1 from "../../Assets/forum1.jpg";
import forum2 from "../../Assets/forum2.jpg";
import forum3 from "../../Assets/forum3.jpg";
import forum4 from "../../Assets/forum4.jpg";
import forum5 from "../../Assets/forum5.jpg";
import bg from "../../Assets/bggg.avif";
import "./Forum.css"; // Importing the CSS file

const forumData = [
  {
    id: 1,
    image: forum1,
    description: "A powerful gathering of investors and financial experts discussing the future of wealth-building."
  },
  {
    id: 2,
    image: forum2,
    description: "An exclusive one-on-one discussion between a top investor and a key WealthBuilders team member."
  },
  {
    id: 3,
    image: forum3,
    description: "A successful investor proudly holding WealthBuilders merchandise, symbolizing financial triumph."
  },
  {
    id: 4,
    image: forum4,
    description: "A dedicated husband and wife duo embracing their investment journey with a strategic merchandise plan."
  },
  {
    id: 5,
    image: forum5,
    description: "Another inspiring couple investing in their future with WealthBuilders’ expert strategies."
  }
];

const Forum = () => {
  return (
    <div className="forum-section">
      <h2 className="forum-header">WealthBuilders Investment Forum</h2>
      <div className="forum-slider-container">
        <div className="forum-slider">
          {forumData.map((item) => (
            <div key={item.id} className="forum-card">
              <img src={item.image} alt="Forum Event" className="forum-image" />
              <p className="forum-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
