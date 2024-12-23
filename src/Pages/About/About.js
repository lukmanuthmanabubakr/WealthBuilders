import React from "react";
import { FaBullseye, FaHandsHelping, FaUsers } from "react-icons/fa"; // icons for vision, mission, and values
import Aboutss from "../../Assets/xampleeee.avif";
import missions from "../../Assets/Missions.jpeg";
import "./About.css";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <>
      <div className="about-container">
        <h1 className="about-title">About Us</h1>

        {/* About Us Section */}
        <div className="about-section">
          <div className="about-image">
            <img src={Aboutss} alt="About Us" />
          </div>
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              We’re a dedicated team focused on delivering exceptional service
              and innovative solutions that align with our core values. Our
              journey began with a vision to empower communities, and we've
              grown consistently by building lasting relationships with our
              clients and partners. Today, we're at the forefront of industry
              innovation.
            </p>
          </div>
        </div>

        {/* Mission, Vision, and Values */}
        <div className="about-mission-section">
          <div className="mission-item">
            <FaBullseye className="icon" />
            <h3>Our Vision</h3>
            <p>
              To lead in creating sustainable and impactful solutions that make
              a difference in people's lives and contribute positively to the
              global community.
            </p>
          </div>
          <div className="mission-item">
            <FaHandsHelping className="icon" />
            <h3>Our Mission</h3>
            <p>
              To provide the highest quality of service while fostering an
              environment of trust, respect, and innovation that positively
              influences society.
            </p>
          </div>
          <div className="mission-item">
            <FaUsers className="icon" />
            <h3>Our Values</h3>
            <p>
              We prioritize integrity, teamwork, accountability, and
              sustainability in all our projects, striving for excellence and
              creating long-lasting relationships with our partners and clients.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
