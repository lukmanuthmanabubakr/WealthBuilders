import React from "react";
import "./OurCustomers.css";

const OurCustomers = () => {
  return (
    <section className="ourCustomers">
      <div className="content">
        <h1>Meet Our Customers</h1>
        <p>
          Join a growing community of businesses and individuals who trust our platform 
          to manage and grow their investments globally.
        </p>
      </div>
      <div className="customerShowcase">
        <div className="customerProfile">
          <img src="image1.jpg" alt="Customer 1" className="customerImage" />
          <h3>Tech Innovators</h3>
          <p>Streamlining operations with smart financial tools.</p>
        </div>
        <div className="customerProfile">
          <img src="image2.jpg" alt="Customer 2" className="customerImage" />
          <h3>Global Traders</h3>
          <p>Reaching new heights with our trusted solutions.</p>
        </div>
        <div className="customerProfile">
          <img src="image3.jpg" alt="Customer 3" className="customerImage" />
          <h3>Freelancers</h3>
          <p>Achieving financial independence seamlessly.</p>
        </div>
      </div>
    </section>
  );
};

export default OurCustomers;
