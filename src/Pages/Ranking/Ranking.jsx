import React from "react";
import SilverMedal from "../../Assets/SilverMedal.png";
import GoldMedal from "../../Assets/gooldMedal.png";
import Diamond from "../../Assets/diamondMedal.png";
import PlatinumMedal from "../../Assets/platinumMedal.png";
import "./Ranking.css";
import Footer from "../../components/Footer/Footer";


const Ranking = () => {
  return (
    <>
      <div className="ranking-container">
        <h1 className="ranking-heading">Your Achievements</h1>
        <p className="ranking-subheading">
          Explore all the badges you can earn on your journey.
        </p>

        <div className="ranking-cards">
          {/* Card 1 */}
          <div className="ranking-card">
            <img
              src={SilverMedal}
              alt="Silver Medal"
              className="ranking-card-img"
            />
            <h2 className="ranking-card-title">Hyip Member</h2>
            <p className="ranking-card-description">
              Earn this by completing your first sign-up on the platform.
            </p>
          </div>
          {/* Card 2 */}
          <div className="ranking-card">
            <img
              src={GoldMedal}
              alt="Gold Medal"
              className="ranking-card-img"
            />
            <h2 className="ranking-card-title">Hyip Leader</h2>
            <p className="ranking-card-description">
              Reach this status by inviting others and expanding your network.
            </p>
          </div>
          {/* Card 3 */}
          <div className="ranking-card">
            <img
              src={Diamond}
              alt="Diamond Medal"
              className="ranking-card-img"
            />
            <h2 className="ranking-card-title">Hyip Expert</h2>
            <p className="ranking-card-description">
              Earn this prestigious badge by completing advanced milestones.
            </p>
          </div>
          {/* Card 4 */}
          <div className="ranking-card">
            <img
              src={PlatinumMedal}
              alt="Platinum Medal"
              className="ranking-card-img"
            />
            <h2 className="ranking-card-title">Hyip Master</h2>
            <p className="ranking-card-description">
              Become a true master of the platform with consistent success and
              growth.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ranking;
