import React from 'react';
import team1 from "../../Assets/team1.jpg";
import team2 from "../../Assets/team2.jpg";
import team3 from "../../Assets/team3.jpg";
import team4 from "../../Assets/team4.jpg";
import "./Teams.css"; // Importing the CSS file

const teamMembers = [
  { 
    id: 1, 
    name: "Billy Epperhart", 
    title: "CEO", 
    image: team1, 
    description: "A visionary leader with decades of experience in wealth creation and financial strategies. Billy has empowered thousands to achieve financial freedom through smart investments and strategic planning."
  },
  { 
    id: 2, 
    name: "Becky Epperhart", 
    title: "Top Ranking Executive", 
    image: team2, 
    description: "An expert in investment management and financial growth, Becky has played a key role in shaping WealthBuilders' innovative investment strategies, helping clients maximize their potential."
  },
  { 
    id: 3, 
    name: "Karen Conrad Metcalfe", 
    title: "Supervisor", 
    image: team3, 
    description: "With a strong background in financial operations, Karen ensures that every investment strategy is executed seamlessly, bringing confidence and clarity to our investors."
  },
  { 
    id: 4, 
    name: "David Briggs", 
    title: "Executive Member", 
    image: team4, 
    description: "A financial strategist with a passion for wealth-building, David brings insights and expertise that help our clients make informed, strategic investment decisions."
  }
];

const Teams = () => {
  return (
    <div className="team-section">
      <h2 className="team-header">Meet Our Team</h2>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-title">{member.title}</p>
            <p className="team-description">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
