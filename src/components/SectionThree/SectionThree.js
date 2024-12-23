import React from "react";
import "./SectionThree.css";
import { FaLightbulb } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";

const SectionThree = () => {
  return (
    <section className="section-three">
      <div className="section-three-content">
        <h1 className="section-three-title">Why Invest with WealthBuilders?</h1>
        <p className="section-three-description">
          Discover how WealthBuilders makes your investments smarter and safer with
          innovative features and expert guidance.
        </p>
        <div className="section-three-cards">
          <div className="card">
            <div className="card-icon">
              {" "}
              <FaLightbulb />{" "}
            </div>
            <h3 className="card-title">Innovative Strategies</h3>
            <p className="card-text">
              We offer cutting-edge investment solutions tailored to your goals.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaLock />{" "}
            </div>
            <h3 className="card-title">Secure Investments</h3>
            <p className="card-text">
              Your investments are safeguarded with top-notch security measures.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              {" "}
              <IoBarChart />
            </div>
            <h3 className="card-title">Growth Opportunities</h3>
            <p className="card-text">
              Unlock new avenues for financial growth with WealthBuilders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
