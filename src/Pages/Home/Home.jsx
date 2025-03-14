import React, { useEffect, useState } from "react";
import "./Home.css";
import tradeBtc from "../../Assets/phoneBg.jpg";
import { NavLink } from "react-router-dom";
import OurCustomers from "../../components/OurCustomers/OurCustomers";
import Faq from "../../components/Faq/Faq";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import SectionTwo from "../../components/SectionTwo/SectionTwo";
import SectionThree from "../../components/SectionThree/SectionThree";
import Advert from "../../Payment/Advert/Advert";
import HomePageAdvert from "../../components/HomePageAdvert/HomePageAdvert";
import Teams from "../../components/Teams/Teams";
import Forum from "../../components/Forum/Forum";

const Home = () => {
  // State to handle loading animation
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_JIVOCHAT_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <HomePageAdvert />
          <div className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div
                className="text-content"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <h1>
                  Unlock Financial <span>Potential</span> with Smart
                  Investments.
                </h1>
                <p>
                  Build a strong and secure financial future with wise
                  investments. No matter your experience level, we offer the
                  resources, strategies, and tools to help you grow your wealth
                  effectively and confidently.
                </p>
                <NavLink to="/dashboard" className="dashboard-link">
                  Dashboard
                </NavLink>
              </div>
              <div className="image-content">
                <img src={tradeBtc} alt="Trade Bitcoin" />
              </div>
            </div>
          </div>
          <SectionTwo />
          <Forum />
          <SectionThree />
          <Teams />
          <Faq />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;