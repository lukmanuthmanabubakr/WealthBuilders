import React from "react";
import Starter from "../../Assets/Starter-plan.avif";
import Bronze from "../../Assets/Bronze-plan.webp";
import Silver from "../../Assets/Silver-Plan.jpeg";
import Gold from "../../Assets/Gold-plan.webp";
import Diamond from "../../Assets/diamondsss.jpeg";
import Platinum from "../../Assets/Platinum-plans.jpeg";
import "./Plans.css";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";


const plansData = [
  {
    title: "Starter Plan",
    image: Starter,
    price: "$100 - $500",
    features: [
      "Access to basic features",
      "Standard customer support",
      "Up to 2 transactions per month",
    ],
    description: "Perfect for individuals starting their investment journey.",
  },
  {
    title: "Bronze Plan",
    image: Bronze,
    price: "$500 - $1,500",
    features: [
      "Everything in Starter Plan",
      "Priority customer support",
      "Up to 5 transactions per month",
      "Access to educational content",
    ],
    description: "For those who want a bit more flexibility and support.",
  },
  {
    title: "Silver Plan",
    image: Silver,
    price: "$2,000 - $5,000",
    features: [
      "Everything in Bronze Plan",
      "Increased transaction limits",
      "Customizable dashboard",
      "Exclusive market analysis",
    ],
    description:
      "Designed for active investors looking for more advanced tools.",
  },
  {
    title: "Gold Plan",
    image: Gold,
    price: "$5,000 - $10,000",
    features: [
      "Everything in Silver Plan",
      "Dedicated account manager",
      "Unlimited transactions",
      "Personalized investment advice",
    ],
    description:
      "Ideal for serious investors who require personalized support.",
  },
  {
    title: "Diamond Plan",
    image: Diamond,
    price: "$10,000 - $50,000",
    features: [
      "Everything in Gold Plan",
      "Premium market insights",
      "Access to expert webinars",
      "24/7 premium customer support",
    ],
    description:
      "The ultimate plan for high-end investors seeking premium services.",
  },
  {
    title: "Platinum Plan",
    image: Platinum,
    price: "$50,000 - $100,000",
    features: [
      "Everything in Diamond Plan",
      "Exclusive partnership opportunities",
      "Tailored investment strategies",
      "Personalized wealth management",
    ],
    description:
      "Our top-tier plan for those who want a truly exclusive experience.",
  },
];

const Plans = () => {
  return (
    <>
      <div className="plans-container">
        <h1 className="plans-heading">Choose Your Perfect Plan</h1>
        <div className="plans-grid">
          {plansData.map((plan, index) => (
            <div key={index} className="plan-card" data-aos="fade-up" data-aos-duration="1000">
              <img src={plan.image} alt={plan.title} className="plan-image" />
              <div className="plan-content">
                <h2 className="plan-title">{plan.title}</h2>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <NavLink to="/start-invest" className="plan-button">Choose Plan</NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plans;
